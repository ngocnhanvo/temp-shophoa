import { formatCurrency } from '@/lib/stringUtils';
import type { APIRoute } from 'astro';
import { getAvas } from '@/lib/avas_env';
export const prerender = false;


export const POST: APIRoute = async ({ request, locals }) => { // Keep POST export
  try {
    const body = await request.json();
    const { name, phone, email, items, subtotal, discountAmount, totalPrice, currency, toEmail, companyName, domain, lang } = body;
    const avas = getAvas(locals);
    // // 1. Xác thực Cloudflare Turnstile trước khi làm bất cứ việc gì khác
    // if (TURNSTILE_SECRET_KEY) {
    //   const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       secret: TURNSTILE_SECRET_KEY,
    //       response: turnstileToken,
    //     }),
    //   });

    //   const verifyData = await verifyResponse.json();
    //   if (!verifyData.success) {
    //     console.warn('⚠️ Cảnh báo: Phát hiện yêu cầu spam hoặc Captcha không hợp lệ.');
    //     return new Response(JSON.stringify({ error: 'Security verification failed' }), { status: 403 });
    //   }
    // }

    const customerEmail = email;
    const companyRecipient = toEmail || "contact@vibecodestudio.com";

    if (!avas.RESEND_API_KEY) {
      console.error('❌ LỖI: Biến RESEND_API_KEY chưa được cấu hình trong Environment Variables. Không thể gửi email.');
      return new Response(JSON.stringify({ error: 'Email service not configured' }), { status: 500 });
    }

    // Từ điển đa ngôn ngữ cho các nhãn trong Email
    const dict: any = {
      vi: {
        fromEmail: `NV bán hàng<${toEmail}>`,
        header: "Đơn hàng đã được xác nhận",
        greeting: "Xin chào",
        thanks: "Cảm ơn bạn đã tin tưởng đặt hàng tại",
        details: "Dưới đây là chi tiết đơn hàng của bạn:",
        colImg: "Ảnh",
        colProduct: "Sản phẩm",
        colQty: "SL",
        colPrice: "Giá",
        colTotal: "Thành tiền",
        subtotal: "Tạm tính:",
        discount: "Giảm giá:",
        grandTotal: "Tổng thanh toán:",
        custInfo: "Thông tin khách hàng:",
        name: "Họ tên:",
        phone: "Số điện thoại:",
        email: "Email:",
        subject: "Xác nhận đơn hàng từ"
      },
      en: {
        fromEmail: `Salesperson <${toEmail}>`,
        header: "Your order has been confirmed",
        greeting: "Hello",
        thanks: "Thank you for shopping at",
        details: "Here are your order details:",
        colImg: "Image",
        colProduct: "Product",
        colQty: "Qty",
        colPrice: "Price",
        colTotal: "Total",
        subtotal: "Subtotal:",
        discount: "Discount:",
        grandTotal: "Grand Total:",
        custInfo: "Customer Information:",
        name: "Full Name:",
        phone: "Phone Number:",
        email: "Email:",
        subject: "Order confirmation from"
      }
    };

    const L = dict[lang] || dict.vi;

    const itemsHtml = items?.map((item: any) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #eee; width: 70px; vertical-align: top;">
          ${item.image 
            ? `<img src="${avas.WC_URL_CLIENT}/${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px; border: 1px solid #eee;" />`
            : '<div style="width: 70px; height: 70px; background: #f0f0f0; border-radius: 8px;"></div>'
          }
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; vertical-align: top;">
          <div style="font-weight: 600; color: #1a1a1a; margin-bottom: 4px; font-size: 15px;">${item.name}</div>
          ${item.descriptionShort ? `<div style="font-size: 12px; color: #777; line-height: 1.4;">${item.descriptionShort}</div>` : ''}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center; vertical-align: top; font-weight: 500;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right; vertical-align: top; white-space: nowrap;">${formatCurrency(item.price, currency)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right; vertical-align: top; font-weight: 600; color: #1a1a1a; white-space: nowrap;">
          ${formatCurrency(item.price * item.quantity, currency)}
        </td>
      </tr>
    `).join('') || '';

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; color: #333; line-height: 1.6;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #eee; padding-bottom: 10px;">${L.header}</h2>
        <p>${L.greeting} <strong>${name}</strong>,</p>
        <p>${L.thanks} <strong>${companyName || 'Store'}</strong>. ${L.details}</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #fcfcfc;">
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #eee; color: #666; font-size: 13px; text-transform: uppercase;">${L.colImg}</th>
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #eee; color: #666; font-size: 13px; text-transform: uppercase;">${L.colProduct}</th>
              <th style="padding: 12px; text-align: center; border-bottom: 2px solid #eee; color: #666; font-size: 13px; text-transform: uppercase;">${L.colQty}</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #eee; color: #666; font-size: 13px; text-transform: uppercase;">${L.colPrice}</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #eee; color: #666; font-size: 13px; text-transform: uppercase;">${L.colTotal}</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" style="padding: 12px; text-align: right; border-top: 1px solid #eee;">${L.subtotal}</td>
              <td style="padding: 12px; text-align: right; border-top: 1px solid #eee;">${formatCurrency(subtotal, currency)}</td>
            </tr>
            ${discountAmount > 0 ? `
            <tr>
              <td colspan="4" style="padding: 12px; text-align: right; color: #d93025;">${L.discount}</td>
              <td style="padding: 12px; text-align: right; color: #d93025;">-${formatCurrency(discountAmount, currency)}</td>
            </tr>` : ''}
            <tr style="font-size: 18px; font-weight: bold;">
              <td colspan="4" style="padding: 12px; text-align: right; border-top: 2px solid #1a1a1a;">${L.grandTotal}</td>
              <td style="padding: 12px; text-align: right; border-top: 2px solid #1a1a1a; color: #1a1a1a;">${formatCurrency(totalPrice, currency)}</td>
            </tr>
          </tfoot>
        </table>

        <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 4px; border: 1px solid #eee;">
          <p style="margin: 0; font-weight: bold;">${L.custInfo}</p>
          <p style="margin: 5px 0;">${L.name} ${name}</p>
          <p style="margin: 5px 0;">${L.phone} ${phone}</p>
          <p style="margin: 5px 0;">${L.email} ${email}</p>
        </div>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${avas.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: L.fromEmail, // Sử dụng email người gửi đã định dạng
        to: customerEmail,
        cc: [companyRecipient],
        subject: `[${companyName || 'Order'}] ${L.subject} ${name}`,
        html: emailHtml,
      }),
    });

    if (res.ok) {
      return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
    } else {
      const errorData = await res.json(); // Đọc phản hồi lỗi từ Resend
      console.error('Resend API Error:', res.status, errorData); // Log lỗi chi tiết
      return new Response(JSON.stringify({ error: 'Failed to send', details: JSON.stringify(errorData), fromEmail: L.fromEmail }), { status: 500 });
    }
  } catch (error) {
    console.error('API Contact Catch Error:', error); // Log lỗi trong khối catch
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Server Error' }), { status: 500 });
  }
};

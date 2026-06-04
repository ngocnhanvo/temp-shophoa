import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function Cart() {
  const { items, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  return (
    <Sheet open={isOpen} onOpenChange={actions.toggleCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-2xl font-heading font-bold text-primary">
            Giỏ hàng của bạn
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12">
            <ShoppingBag className="h-16 w-16 text-secondary/40 mb-4" />
            <p className="text-lg text-secondary font-paragraph">
              Giỏ hàng trống
            </p>
            <p className="text-sm text-secondary/70 font-paragraph mt-2">
              Thêm sản phẩm để tiếp tục
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 p-4 bg-secondary/5 rounded-xl hover:bg-secondary/10 transition-colors duration-200"
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-paragraph font-semibold text-primary mb-1 line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-base font-paragraph font-bold text-accent mb-2">
                        {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-paragraph font-semibold text-primary w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 ml-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => actions.removeFromCart(item)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border/40 pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-paragraph font-semibold text-primary">
                  Tổng cộng:
                </span>
                <span className="text-2xl font-heading font-bold text-accent">
                  {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
                </span>
              </div>
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-white py-6 text-base font-paragraph font-semibold transition-all duration-200 hover:scale-[1.02]"
                onClick={actions.checkout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <LoadingSpinner className="h-5 w-5" />
                ) : (
                  'Thanh toán'
                )}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

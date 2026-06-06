import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';

export const handlePageLink = (e: React.MouseEvent, path: string, navigate: any) => {
    e.preventDefault();
    if(window.location.pathname != path)
      window.dispatchEvent(new Event('app:nav-start'));
    
    // Chờ 50ms để hiệu ứng bắt đầu trước khi trình duyệt bận xử lý render trang mới
    setTimeout(() => {
      navigate(path);
    }, 0);
};

export const PageTransition = () => {

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let startTime = 0;
    const MIN_DURATION = 250; // Giảm thêm để phản hồi tức thì hơn

    const start = () => {
      startTime = Date.now();
      setIsAnimating(true);
    };

    const stop = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      
      // Đợi cho đến khi đủ thời gian tối thiểu mới tắt hiệu ứng
      setTimeout(() => {
        setIsAnimating(false);
      }, remaining);
    };

    window.addEventListener('app:nav-start', start);
    window.addEventListener('app:nav-end', stop);

    return () => {
      window.removeEventListener('app:nav-start', start);
      window.removeEventListener('app:nav-end', stop);
    };
  }, []);
  
  // Cố định các thông số hạt để tránh tính toán lại khi render
  const particles = useMemo(() => {
    return [...Array(4)].map((_, i) => ({ // Giảm số lượng hạt xuống 4 để tăng FPS
      id: i,
      size: 200 + Math.random() * 150,
      xMove: (Math.random() - 0.5) * 100,
      yMove: (Math.random() - 0.5) * 100,
      duration: 0.3, // Cố định thời gian ngắn để tạo cảm giác nhanh
      delay: i * 0.01,
      color: `radial-gradient(circle, rgba(255,107,107,${0.2 - i * 0.02}) 0%, rgba(78,205,196,${0.1 - i * 0.01}) 50%, transparent 80%)`
    }));
  }, []);

  return (
    <>
      {/* Smoke Effect Overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: isAnimating ? 1 : 0 }}
        transition={{ duration: 0.15 }} // Fade nhanh hơn
        className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(248,249,250,0.9) 100%)',
        }}
      >
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: '-50%',
              y: '-50%',
              left: '50%',
              top: '50%'
            }}
            animate={isAnimating ? {
              opacity: [0, 1, 0],
              scale: [0.8, 1.8, 2.5],
              x: ['-50%', `calc(-50% + ${p.xMove}%)`],
              y: ['-50%', `calc(-50% + ${p.yMove}%)`],
            } : { opacity: 0, transition: { duration: 0.1 } }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "easeOut"
            }}
            className="absolute rounded-full will-change-transform"
            style={{
              width: p.size,
              height: p.size,
              background: p.color,
              filter: 'blur(20px)', // Giảm độ nhòe xuống nữa để giảm tải GPU
            }}
          />
        ))}
      </motion.div>

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.1,
          ease: "easeInOut"
        }}
      >
      </motion.div>
    </>
  );
}

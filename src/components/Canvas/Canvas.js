import React, { useEffect, useRef } from 'react';

const Canvas = ({ color }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Thêm padding cho canvas
    const padding = 10;
    const canvasWidth = canvas.width - padding * 2;
    const canvasHeight = canvas.height;

    // Tính toán tọa độ mới của các điểm để tránh mất nét ở hai bên
    const startX = padding;
    const startY = 60;
    const controlX1 = padding + 30;
    const controlY1 = -20;
    const controlX2 = padding + 90;
    const controlY2 = 100;
    const endX = padding + 120;
    const endY = 30;

    context.beginPath();
    context.moveTo(startX, startY);

    context.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);

    context.strokeStyle = color;
    context.lineWidth = 8;
    context.stroke();
    context.lineCap = 'round';
  }, []);

  return <canvas ref={canvasRef} width={120 + 20} height={100} />;
};

export default Canvas;

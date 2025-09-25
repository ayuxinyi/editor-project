import { useMutation, useStorage } from '@liveblocks/react/suspense';
import React, { memo, MouseEvent, useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

const markers = Array.from({ length: 83 }, (_, i) => i);

const Ruler = memo(() => {
  const leftMargin = useStorage(root => root.leftMargin) ?? 56;
  const setLeftMargin = useMutation(({ storage }, position: number) => {
    storage.set('leftMargin', position);
  }, []);

  const rightMargin = useStorage(root => root.rightMargin) ?? 56;
  const setRightMargin = useMutation(({ storage }, position: number) => {
    storage.set('rightMargin', position);
  }, []);

  // const [leftMargin, setLeftMargin] = useState(56);
  // const [rightMargin, setRightMargin] = useState(56);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement | null>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };

  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (ev: MouseEvent<HTMLDivElement>) => {
    // 可拖动容器的宽度
    const CONTAINER_WIDTH = 816;
    // 标尺之间的最小间距
    const MINIUM_DISTANCE = 100;

    // 判断是否正在拖动左侧或右侧，并且ruler元素存在
    if ((isDraggingLeft || isDraggingRight) && rulerRef.current) {
      // 获取拖动区域容器
      const container = rulerRef.current.querySelector('#ruler-container');
      if (container) {
        // 获取容器的位置
        const containerRect = container.getBoundingClientRect();
        // 计算当前鼠标位置相对于拖动容器的水平位置
        const relativeX = ev.clientX - containerRect.left;
        // 计算当前鼠标位置对应的标尺位置，确保在0到816之间
        const rawPosition = Math.max(0, Math.min(CONTAINER_WIDTH, relativeX));
        // 如果是拖动左边的标尺
        if (isDraggingLeft) {
          // 容器的宽度为816px，rightMargin为右边标尺距离容器最右边的距离，而100是两个标尺
          // 之间的间距。
          const maxLeftPosition =
            CONTAINER_WIDTH - rightMargin - MINIUM_DISTANCE;
          // 取两者之间的最小值，确保标尺不会超出边界，不会出现在右边标尺的右边。
          const newLeftPosition = Math.min(rawPosition, maxLeftPosition);
          setLeftMargin(newLeftPosition);
        } else if (isDraggingRight) {
          const maxRightPosition =
            CONTAINER_WIDTH - leftMargin - MINIUM_DISTANCE;
          const newRightPosition = Math.max(CONTAINER_WIDTH - rawPosition, 0);
          const containerRightPosition = Math.min(
            maxRightPosition,
            newRightPosition
          );
          setRightMargin(containerRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    setLeftMargin(56);
  };

  const handleRightDoubleClick = () => {
    setRightMargin(56);
  };

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="w-[816px] mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden"
    >
      <div id="ruler-container" className="w-full h-full relative">
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map(marker => {
              const position = (marker * 816) / 82;
              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = memo(
  ({
    position,
    isDragging,
    isLeft,
    onDoubleClick,
    onMouseDown
  }: MarkerProps) => {
    return (
      <div
        className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
        style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
      >
        <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
        <div
          className="absolute left-1/2 top-4 transform -translate-x-1/2"
          style={{
            height: '100vh',
            width: '1px',
            transform: 'scaleX(0.5)',
            backgroundColor: '#3b72f6',
            display: isDragging ? 'block' : 'none'
          }}
        />
      </div>
    );
  }
);

export default Ruler;

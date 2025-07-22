import { useRef } from "react";
import Draggable from "react-draggable";

interface PageItem {
  id: string;
  type: "text" | "image" | "audio";
  content: string;
  x: number;
  y: number;
}

interface DraggableItemProps {
  item: PageItem;
  onStop: (x: number, y: number) => void;
}

export function DraggableItem({ item, onStop }: DraggableItemProps) {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={{ x: item.x, y: item.y }}
      onStop={(_e, data) => onStop(data.x, data.y)}
    >
      <div ref={nodeRef} className="absolute">
        {item.type === "text" && (
          <p className="bg-white px-2 py-1 border rounded text-sm shadow">
            {item.content}
          </p>
        )}
        {item.type === "image" && (
          <img
            src={item.content}
            alt="Draggable content"
            className="max-w-[200px] max-h-[200px] border rounded shadow"
          />
        )}
        {item.type === "audio" && (
          <audio controls>
            <source src={item.content} />
            <track
              kind="captions"
              src="captions.vtt"
              srcLang="en"
              label="English"
            />
          </audio>
        )}
      </div>
    </Draggable>
  );
}

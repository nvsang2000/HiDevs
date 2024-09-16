"use client"
import { useEffect, useState } from "react";

export default function TableOfContents ({ content }: any) {
    const [toc, setToc] = useState<Array<{ id: string; title: string }>>([]);
  
    useEffect(() => {
      const headers = content?.match(/^(### |## |# )(.*)/gm);
      if (headers) {
        const tocItems = headers.map((header: any) => {
          const title = header.replace(/^(### |## |# )/, '');
          const id = title.toLowerCase().replace(/[^\w]+/g, '-');
          return { id, title };
        });
        setToc(tocItems);
      }
    }, [content]);
  
    return (
      <nav className="fixed">
        <div className="mb-[20px]">TABLE OF CONTENTS</div>
        <ul>
          {toc.map((item: any) => (
            <li key={item.id} className={`ml-${(item.level - 1) * 4}`}>
              <a href={`#${item.id}`}>{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
"use client";
import { InView } from "@/components/core/in-view";
import Image from "next/image";

export function ProfileHeader() {
  return (
    <div className="space-y-4">
      <InView
        variants={{
          hidden: { opacity: 0, y: -15, filter: "blur(4px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewOptions={{ once: true }}
      >
        <Image
          src="/images/avatars/jiawei.png"
          alt="logo"
          width="40"
          height="40"
        />
      </InView>

      <div>
        <InView
          variants={{
            hidden: { opacity: 0, y: -20, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          viewOptions={{ once: true }}
        >
          <h1 className="text-2xl font-medium tracking-tighter">
            Jia Wei Ng{" "}
            <span className="text-xl text-muted-foreground">(Jay)</span>
          </h1>
        </InView>

        <InView
          variants={{
            hidden: { opacity: 0, y: -10, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          viewOptions={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">25 y/o, singapore</p>
        </InView>
      </div>
    </div>
  );
}

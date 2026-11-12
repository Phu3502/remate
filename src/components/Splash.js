import Image from "next/image";

export default function Splash() {
  return (
    <div id="sp" aria-hidden="true">
      <Image src="/images/logo.png" alt="" width={700} height={667} priority />
    </div>
  );
}

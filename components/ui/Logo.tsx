/**
 * VDM wordmark — gold gradient serif "VDM" over a letter-spaced subtitle,
 * recreated to match the brand logo. Swap for the original asset in /public
 * by dropping in an <img> here if a vector/PNG is provided.
 */
export default function Logo({
  size = "md",
  align = "left",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  align?: "left" | "center";
  className?: string;
}) {
  const mark =
    size === "lg" ? "text-[2.9rem]" : size === "sm" ? "text-[1.5rem]" : "text-[1.9rem]";
  const sub =
    size === "lg" ? "text-[0.62rem]" : size === "sm" ? "text-[0.42rem]" : "text-[0.5rem]";
  return (
    <span
      className={`inline-flex flex-col ${align === "center" ? "items-center" : "items-start"} ${className}`}
      aria-label="VDM Vize Danışmanlık Merkezi"
    >
      <span className={`logo-mark ${mark}`}>VDM</span>
      <span className={`logo-sub ${sub} mt-[0.15em] whitespace-nowrap`}>
        VİZE DANIŞMANLIK MERKEZİ
      </span>
    </span>
  );
}

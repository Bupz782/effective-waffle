"use client";

/**
 * Component for "JobSlices" Slices.
 */
export default function JobSlices({ slice }: { slice: any }) {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for job_slices (variation: {slice.variation})
      slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
    </section>
  );
}

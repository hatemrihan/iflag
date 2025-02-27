"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

export function SubmitButton({ children, isLoading, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const isSubmitting = pending || isLoading;

  return (
    <Button 
      type="submit" 
      disabled={isSubmitting}
      className={className}
      variant={isSubmitting ? "outline" : "default"}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        children || "Submit"
      )}
    </Button>
  );
}
// "use client";

// import { useFormStatus } from "react-dom";
// import { Button } from "./ui/button";
// import { Loader2 } from "lucide-react";

// export function SubmitButton() {
//   const { pending } = useFormStatus();
//   return (
//     <Button type="submit" disabled={pending} className="w-full">
//       {pending ? (
//         <>
//           <Loader2 className="size-4 mr-2 animate-spin" /> 
//           Submitting...
//         </>
//       ) : (
//         "Submit"
//       )}
//     </Button>
//   );
// }
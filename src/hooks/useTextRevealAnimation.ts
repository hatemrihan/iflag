import { delay, stagger, useAnimate } from "motion/react";
import { transform } from "next/dist/build/swc";
import { useEffect } from "react";
import SplitType from "split-type";

const useTextRevealAnimation = () =>{
    const[scope, animate] = useAnimate();
useEffect(() => {
    if (scope.current) {
        new SplitType(scope.current, {
            types: "lines,words",
            tagName: "span"
        });
    }
}, [scope]);

const entranceAnimation = () => {
    if (scope.current) {
        return animate(
            scope.current.querySelectorAll(".word"),
            {
                transform: "translateY(0)",
            },
            {
                duration: 0.5,
                delay: stagger(0.1),
            }
        );
    }
};
const exitAnimation =() => {
    return animate(scope.current.querySelectorAll('.word'),{
        transform: 'translateY(100%)'
    },

{
  duration:0.1,
  delay:stagger(-0.3,{
    startDelay: scope.current.querySelectorAll('.word').length * 0.25
  })  
});
};

    return{
        scope,
        entranceAnimation,
        exitAnimation,
    };
};

export default useTextRevealAnimation;
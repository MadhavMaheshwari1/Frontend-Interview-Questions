import { useRef, React, useEffect } from 'react';

const ProgressBar = () => {
    const text = useRef(null);
    const progressBarContainer = useRef(null);
    const progressBar = useRef(null);

    useEffect(() => {
        // You can update the text content during the animation
        if (progressBarContainer && text.current && progressBar.current) {
            let progress = 0;
            let widthContainer = progressBarContainer.current.style.width;

            const interval = setInterval(() => {
                if (progress <= 100) {
                    text.current.innerText = `${progress}%`;
                    progressBar.current.style.width = `${progress}%`;
                    if (progressBar.current.style.width === (widthContainer / 2)) {
                        text.current.style.color = "white";
                    }
                    progress++;
                } else {
                    clearInterval(interval);
                }
            }, 50);
        }
    }, []);

    return (
        <div className='max-w-[1400px] mx-auto flex justify-center items-center py-2 flex-col gap-6'>
            <h1 className='text-3xl font-semibold'>Progress Bar</h1>
            <div ref={progressBarContainer} className="min-w-[700px] rounded-full bg-gray-200 h-[2.5rem] relative">
                <h1 className='left-0 top-0 absolute w-full flex justify-center items-center text-xl h-full' ref={text}></h1>
                <div className="h-full rounded-xl bg-green-500 animate-progress" ref={progressBar}></div>
            </div>
        </div>
    );
}

export default ProgressBar;

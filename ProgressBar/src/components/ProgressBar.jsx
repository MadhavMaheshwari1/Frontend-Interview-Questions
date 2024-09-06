import { useRef, React, useEffect } from 'react';

const ProgressBar = () => {

    const progressBarContainer = useRef(null);
    const progressBar = useRef(null);

    useEffect(() => {
        const progreeBarIncrement = () => {
            if (progressBarContainer.current && progressBar.current) {
                let progress = 0;
                progressBar.current.style.backgroundColor = "#00ff1a"; // Ensure you set the background color dynamically
                const interval = setInterval(() => {
                    if (progress <= 100) {
                        progressBar.current.style.width = `${progress}%`;
                        progressBar.current.innerText = `${progress}%`;
                        progress++;
                    } else {
                        clearInterval(interval);
                    }
                }, 50); // Adjust the interval time for the speed of the progress
            }
        };

        progreeBarIncrement();
    }, [])


    return (
        <div className='max-w-[1400px] mx-auto flex justify-center items-center py-2 flex-col gap-6'>
            <h1 className='text-3xl font-semibold'>Progress Bar</h1>
            <div ref={progressBarContainer} className="min-w-[700px] rounded-full bg-gray-200 h-[2.5rem]">
                <div ref={progressBar} className="h-full flex justify-center items-center text-xl rounded-xl">0%</div>
            </div>
        </div>
    )
}

export default ProgressBar
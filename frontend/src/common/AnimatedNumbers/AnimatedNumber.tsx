import React, { FC, useEffect } from 'react';
import './AnimatedNumber.scss';

type AnimatedNumberProps = {
    number: number;
};

const AnimatedNumber: FC<AnimatedNumberProps> = ({ number }) => {
    const digits = Array.from(number.toString()).map(Number);

    return (
        <div className="flex">
            {digits.map((digit, index) => (
                <AnimatedDigit key={index} digit={digit} />
            ))}
        </div>
    );
};

const AnimatedDigit = (props: { digit: number }) => {
    const { digit } = props;

    const ref = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const elements = Array.from(ref.current!.children);
        elements.forEach((el) => {
            (el as HTMLElement).style.transform = `translateY(-${
                digit * 1.5
            }em)`;
        });
    }, [digit]);

    return (
        <div className="digit" ref={ref}>
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
        </div>
    );
};

export default AnimatedNumber;

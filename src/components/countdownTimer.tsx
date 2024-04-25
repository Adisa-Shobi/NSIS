import { Badge } from './ui/badge';
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
    seconds: number;

} 

const CountdownTimer = (props: CountdownTimerProps) => {   

    return (
        <div className="absolute top-3 left-3">
            <Badge variant="destructive" >{props.seconds}</Badge>            
        </div>
    );
};

export default CountdownTimer;

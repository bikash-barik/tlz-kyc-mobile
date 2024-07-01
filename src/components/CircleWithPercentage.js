import React from 'react';
import { View,Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { ProgressCircle } from 'react-native-progress';

const CircleWithPercentage = ({ percentage }) => {
    const radius = 80;
    const strokeWidth = 10;
    const outerCircleRadius = radius;
    const innerCircleRadius = radius - strokeWidth * 2;

    return (
        <View>
            {/* Outer Circle */}
            <Svg height={radius * 2} width={radius * 2}>
                <Circle
                    cx={radius}
                    cy={radius}
                    r={outerCircleRadius}
                    stroke="#ccc"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
            </Svg>

            {/* Inner Circle with Percentage */}
            <ProgressCircle
                percent={percentage}
                radius={innerCircleRadius}
                borderWidth={0}
                color="#3498db"
                shadowColor="#ccc"
                bgColor="#fff"
            >
                {/* You can customize the format of the displayed percentage */}
                <View>
                    <Text style={{ fontSize: 20 }}>{percentage}%</Text>
                </View>
            </ProgressCircle>
        </View>
    );
};

export default CircleWithPercentage;

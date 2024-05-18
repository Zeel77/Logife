"use client"
import React,{useEffect,useState} from 'react'
import { ResponsivePie } from '@nivo/pie'

const DonutChart = ({active,inactive}) => {
   
    
    const data = [
        {
          "id": "active",
          "label": "Active",
          "value": active,
          "color": "hsl(152, 70%, 50%)"
        },
        {
          "id": "inactive",
          "label": "Inactive",
          "value": inactive,
          "color": "hsl(174, 70%, 50%)"
        }
      ]

  return (
    <div className='h-[20vmax] w-[25vmax]'>
        <ResponsivePie
        data={data}
        margin={{ top: 10, right: 40, bottom: 30, left: 40 }}
        innerRadius={0.6}
        padAngle={2}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        enableArcLabels={false}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 6,
                translateY: 20,
                itemWidth: 55,
                itemHeight: 10,
                itemsSpacing: 3,
                symbolSize: 10,
                itemDirection: 'left-to-right'
            }
        ]}
    />
    </div>
  )
}

export default DonutChart
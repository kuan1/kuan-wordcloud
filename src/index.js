import echarts from 'echarts'
import 'echarts-wordcloud'

/**
 * 简单封装文字云
 * el: DOM
 */
export default function initCloud(el, data) {
  const chart = echarts.init(el)
  const options = {
    series: [
      {
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '95%',
        height: '95%',
        right: null,
        bottom: null,
        sizeRange: [1, 200],
        rotationRange: [-90, 90],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        textStyle: {
          normal: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: function() {
              return (
                'rgb(' +
                [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') +
                ')'
              )
            }
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        data
      }
    ]
  }

  chart.setOption(options)

  window.addEventListener('resize', chart.resize)
  return chart
}

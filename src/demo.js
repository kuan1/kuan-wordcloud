import './styles.less'
import initCloud from './index'
import githubTreedingData from './githubTreeding2018-10-01.json'

const data = githubTreedingData.map(item => ({
  name: item.repo,
  value: item.stars.replace(/\D/, '')
}))

initCloud(document.getElementById('demo'), data)
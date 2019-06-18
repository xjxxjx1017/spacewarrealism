# spacewarrealism
A space war game

# Task List

Working on item No.1 - No.3 of the spec:

![Specification](/assets/spec/实派宇宙V.png "Specification")

Current progress:

![Progress](/assets/spec/2019-04-13.16-12-52.png "Progress")

TODO:
* 攻击弹道方向修正(Bug)
* 定向飞弹
* 世界地图的多边形大环境物理
* 世界地图的多边形环境物理物体
* 飞船的细致精确物理
	* 仔细想一下要怎么弄这个精细物理
	* 每一个quadtree都有一部分物理
	* 实现: 强行挤过羊肠道
	* 实现: 飞速三角地形撞击飞船 (点击键盘3触发)
* 各物体的编辑器,与载入
* 简单目标与关卡

## Environment

* Phaser 3 		
* Vue
* Element-UI
* Typescript 	
* SASS	
* Webpack 			
* Lodash

## Public Access
https://xjxxjx1017.github.io/spacewarrealism/

## How to run dev server

* install nodejs
* Open terminal, go to file directory
* npm install
* run devserver.bat

## Design Doc
* 微操：飞船设计（详细的资源／物理／布局设计）
* 小关卡：从目标地点／单位／城池收集碎片
* 奖励目标：获得奖章（或指代特殊资源）
* 长期目标：资源分配．资源使用效率考验．收集尽量多的奖章）
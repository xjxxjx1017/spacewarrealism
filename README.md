# spacewarrealism
A space war game

# Task List

Working on item No.1 - No.3 of the spec:

![Specification](/assets/spec/实派宇宙V.png "Specification")

Current progress:

![Progress](/assets/spec/2019-04-13.16-12-52.png "Progress")

TODO:
* 飞船的save/load修复
	* world point to local, local point to world
	* 有Container之后飞船间的攻击
	* 怎么储存容器关系
* 小镜头表示世界镜头
* 飞船的细致精确物理
* 物体设计的Scale变化
* 城池,单位,地点Scale的兼容于共存
* 各物体的编辑器,与载入
* 飞船的旋转操作
* 飞船的攻击
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
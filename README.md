# spacewarrealism
A space war game

# Task List

Working on item No.1 - No.3 of the spec:

![Specification](/assets/spec/实派宇宙V.png "Specification")

Current progress:

![Progress](/assets/spec/2019-04-13.16-12-52.png "Progress")

TODO:
* 笔记
	* 目前每个单位分得很开, 并没有很好地组织, 每次新做一个东西都很花时间, 现在还没想好怎么样能搞好一个全面适用的系统. 可以先策划一下, 希望最终的系统是怎么样的.
* 抽象出可搭载子变体的自由变体类
	* 涵盖子弹, 飞船, 陨石, 边界, 炮塔
* 工厂系统
	* 以时间为基础的状态机堆栈
		* 事件
			* 碰触边界, 时间间隔, 固定时间节点, 物体碰撞(分为边界接触/相交体积), 存档/读档, 编辑, 攻击成功/被攻击, 玩家控制, 渲染更新
		* 状态机的条件
			* 存活, HP
		* 状态机
			* 位置(点), 力/速度, 形状(分为圆形/矩形/不规则), 攻击(点/线/生产), 相消(与某形状), 毁灭, 加载子物件, 渲染方式
* 利用以上两系统, 重写所有被涵盖的类
	* 例: 玩家飞船与边界物体的碰撞与消减
	* 例: 像飞船一样行动的陨石, 并且可以攻击, 碰到玩家会相消
	* 例: 最初的关卡设计
* 简单目标与关卡
	* 飞来的陨石
	* 躲避/击碎陨石
	* 关卡进步, 陨石更多
	* 挑战最高分
* 华丽的UI
* 丰富游戏内容:
	* 陨石 -> 采矿
	* 装甲.护罩.基于现有系统
	* 生存, 资源消耗的管理

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
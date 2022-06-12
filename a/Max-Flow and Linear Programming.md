[toc]
# Max-Flow and Linear Programming
## Linear Programming
$$\max c^Tx\\
Ax\le b\\
x\ge 0$$
### Simplex
单纯形法
pivoting rule
最坏指数时间，实际相当快
### 多项式时间算法
#### Ellipsoid Algorithm
椭球法
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20091212.png)
#### Interior Alogrithm
内点法
### dual problem
$$\min b^Ty\\
y^TA\ge c^T\\
y\ge 0$$
#### Weak Duality Therom
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20091613.png)
### min vertex cover
$S$ is a vertex cover $\iff V-S$ is an independent set
min vertex cover 等价于 max independent set
### Approximation Algorithm
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20092513.png)
是整数规划(Integer Programming)，NP-Complete
进行松弛后得到线性规划
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20092739.png)
Rounding:
$$S=\{i|x_i^*\ge\frac{1}{2}\}$$
$S$ 是一个近似比为2的解
- S 是 vertex cover
- $|S|\le2\text{OPT}$

![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20093503.png)
### Max-SAT
CNF $\phi=c_1\wedge c_2\wedge...\wedge c_m$
$V=\{x_1,...,x_n\}$
要求满足最多的$c_i$
$$c_j={x_{j_1}}\vee{x_{j_2}}\vee...\vee x_{j_{l_i}}$$随机取$x_i$，平均能满足大于一半的$c_i$
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20095007.png)
#### Deramdomization via Conditional Expectation
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20094827.png)
[听不明白了](./6454819868512e9ee5c842b9f394f476.mp4)
### 零和游戏的Von Neumann min-max定理
零和游戏：你赢一分我输一分
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20191621.png)
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20192139.png)
## Max-Flow
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20104502.png)
### (s,t)-cut of G
割
a partition (L,R) of V
$s\in L, t \in R$
capacity of a cut (L,R)
### Max-Flow-Min-Cut Theorem
最大流等于最小割
strong duality 的特例
### Ford-Fulkerson
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20160208.png)
### Edmonds-Karp
通过每次用BFS寻找s-t path的方式来执行Ford-Fulkerson，保证了residual network当中每个点离s距离的单调性，从而实现多项式时间复杂度
$$O(m^2n)\\
m=|E|\\
n=|V|$$
### Bipartite Graph Matching
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20160820.png)
这个图的最小割就是**min vrttex cover**
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20161305.png)
cut只在<f style="color:lime;">绿色</f>部分出现
$A_2\cup B_1$是最大独立集
$A_1\cup B_2$就是最小点覆盖
### 比赛冠军问题建模
问E队还有可能胜场第一吗
则让E剩下的全赢
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20162731.png)
若最大流为27，则E还有机会
若最大流小于27，则说明没办法把这27场比赛全部安排过去
### Dinic 算法
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20164756.png)
### 最大流的拓展
#### min-cost maxflow
找代价最小的最大流
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20165321.png)
只需找增广路时不用dfs而是用找带负权的最短路
负权是因为反向时取的代价为负
#### 带上下界的网络流
##### 无源无汇
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20184729.png)
##### 有源有汇
在原图中的源点和汇点之间连上 $t\to s$ 即可变为无源无汇
##### 有源有汇最大流
在找到一个可行流后，再在残量网络上做最大流
#### 一个例题
![](./img5/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-10%20185945.png)
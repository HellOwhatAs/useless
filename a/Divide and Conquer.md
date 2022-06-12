[toc]
# Divide and Conquer
## Merge Sort
时间复杂度
$$T(n)=\left\{
\begin{array}{cl}
1&n=1\\
\qquad\\
2T(\frac{n}{2})&\text{otherwise}
\end{array}
\right.\\
\qquad\\
\begin{aligned}
    T(n)&=2^kT(\frac{n}{2^k})+k\cdot c\cdot n\\
    &=n+c\cdot n\log n\\
    &=O(n\log n)
\end{aligned}$$
可以证明基于比较大小的排序算法最快也要$O(n\log n)$
$$3^{T(n)}\ge n!\Rightarrow T(n)\ge n\log n$$
## 计算逆序对
$a[1,...,n]$
求集合$\left\{(i,j)|i<j\&\&a[i]>a[j]\right\}$的大小

子问题$[1,\left\lfloor\frac{n}{2}\right\rfloor],[\left\lceil\frac{n}{2}\right\rceil,n]$的直接合并会要$O(n^2)$时间，可以通过顺便归并排序得到有序的字串，就可以过一遍得到所有的“一左一右”的逆序对
时间复杂度也是$O(n\log n)$
## Master定理
主定理
$$T(n)=a\cdot T(\frac{n}{b})+O(n^d)\\
\qquad\\
T(n)=\left\{\begin{array}{cl}
    O(n^d)&d>\log_ba\\
    \qquad\\
    O(n^d\log n)&d=\log_ba\\
    \qquad\\
    O(n^{\log_ba})&d<\log_ba
\end{array}\right.$$
证明： $$\begin{aligned}
    T(n)&=\sum_{k=0}^{\log_bn}c\cdot a^k\cdot\left(\frac{n}{b^k}\right)^d\\
    &=c\cdot n^d\cdot \sum_{k=0}^{\log_bn}\left(\frac{a}{b^d}\right)^k
    \end{aligned}\\
    \text{等比数列求和即可}$$

## 数的乘法
![](./img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-12%20214412.png)
可以将子问题减少为3个
![](./img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-12%20214600.png)

## 第k大数
$$a[1,...,n]$$通过快速排序的第一步将数组分为两个部分使得第一个部分的最大值小于第二个部分的最小值
取一个pivot，执行快排的第一步，找到它的index l
if l=k return x
if l>k return Find(a+l+1,k)
return Find(a,k-l)
## 找二维平面上点之间的最短距离
![](./img/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-06-12%20222700.png)

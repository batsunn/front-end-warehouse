## git小乌龟操作

#### git操作不同分支上的文件，先切换分支，在进行拉取，最后进行文件操作

**1.安装**

```javascript
根据电脑下载64位git以及可视化小乌龟
安装完成,在右键菜单中会多出来两个功能:
Git GUI Here
Git bash Here
```

**2.使用git基本设置**

```javascript
a、设置用户名：git  config -- global  user.name  '你再github上注册的用户名';

b、设置用户邮箱：git  config -- global  user.email  '注册时候的邮箱';
# 保存本地仓库的账号
git config --local credential.helper store
# 保存git全局账号
git config --global credential.helper store
```



**3.git基本操作常用命令**

```javascript
git --version   查看当前git的版本 
git --help  查看git的帮助命令: 可以看git提供的命令

cd 目录名  表示进入指定目录文件夹 
ls 查看当前目录中的所有的文件或文件夹 
pwd 查看当前命令在哪个路径中
clear 清屏

mkdir 目录名      表示创建目录
touch 文件名.后缀  表示创建具体的文件

rm 文件.后缀    表示删除指定文件
```



**4.git传文件到远程仓库**

```javascript
步骤1:  git init  初始化仓库(相当于在当前目录中创建一个.git隐藏文件)
步骤2:  git clone 仓库地址
                如: git clone https://gitee.com/farmerY/testdemo.git
步骤3:进行文件或文件夹的CRUD操作(增删改查) 
步骤4:把新加入的文件或文件夹,纳入版本库  
            git status  查看当前文件或文件夹是否纳入版本库
                红色:表示没有在版本库中
                绿色: 表示在版本库中
            git add 文件名  -----表示添加单个文件到版本库
            git add .   ---表示把所有未在版本库的文件及目录都纳入版本库
            注意:
                如果是空目录,不会直接提交到服务器端的
步骤5:提交到本机缓存区 
            git commit -m "写入日志备注说明"
                注意: 日志为必填项
步骤6: 提交本机缓存区中的代码到服务器端
            git push origin 分支名
            如: git push origin master 
步骤7: 拉取服务器的内容(除第一次以外,后期所有操作,都执行  先拉取 再修改 再提交) 
            git pull 
```

**5.删除和撤销**

```javascript
假删除:
            针对已经在仓库中的文件
            rm 文件  如: rm test.txt 只是从视觉中删除,仍然在本地仓库中
            撤销上面的删除操作:  git checkout 文件

        彻底删除:
            需要先纳入版本库  git add .
            再提交到本地 ----本地没有了  git commit -m "备注信息"
            再推送到master----线上也没有了 git push origin master
```

**6.分支操作**

```javascript
查看分支：git branch
创建+切换分支：git checkout –b 分支名
切换分支：git checkout 分支名
合并某分支到当前分支：git merge 需要合并的分支名
提交分支到服务器端:  git push origin 分支名
删除本地分支：git branch –d name
删除远程仓库分支： git push origin --delete 需要删除的分支名
```

**7.分支解决**

```javascript
 git checkout –b test//创建一个分支test 
            对readme进行修改  然后add  最后commit
git checkout master //切换分支
            对readme.txt进行修改  然后add  最后commit
git merge test//此时合并分支报错 
            此时修改master中readme.txt 内容与test一致
git add readme.txt //添加到暂存区域
git commit -m ‘conflict fixed’//冲突解决提交

```

**8.git回退到之前的版本**

```javascript
1. 查看版本号：
git log
2. 使用“git reset --hard 目标版本号”命令将版本回退：
3.再用“git log”查看版本信息，此时本地的HEAD已经指向之前的版本：
HEAD->master
4.git push -f”强制推上去,就可以了
```


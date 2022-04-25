# therb-frontend  
THERB-frontendはTHERB(HASP)のシミュレーション結果を分析、管理するためのwebインターフェースです。  
THERB-webには以下のような機能が実装される予定です。  
1. THERB-GHからアップロードされた入力データを元にシミュレーションを回し、結果を抽出、データベースに保存. 
2. データベースに保存されているデータをグラフ表示してくれるUI
3. データを外部と連携するためのAPIインターフェース

## 環境設定    
1. command promptを開き、ディレクトリ移動  
2. 以下のコマンドをたたく   
```
yarn install
yarn dev
```
3. ローカルサーバーが立ち上がり、以下のページを表示することができる(therb-backendも立ち上げておく必要あり）

プロジェクトページの表示
```
http://localhost:8000/projects 
```

時系列データの表示
```
http://localhost:8000/{projectId}/timeseries 
```
![image](https://user-images.githubusercontent.com/10389953/158009531-898334c6-9afb-4d1f-a458-e7533511d4af.png)


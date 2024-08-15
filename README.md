# AbemaSync for Chrome

AbemaTV における同時視聴用拡張機能です．

[straight-tamago 氏](https://github.com/straight-tamago)による[AbemaSync](https://github.com/straight-tamago/AbemaSync)の Fork です．

# 動作環境

-   PHP サーバー
-   Chromium 系ブラウザ

# 使用方法

-   Server の中身を PHP サーバーに配置する．
-   `chrome://extensions/`にアクセスし，`パッケージ化されていない拡張機能を読み込む`から，Client フォルダを選択する．
-   拡張機能の設定で，index.php の url を指定する．
-   複数台で同時に開いて同期されているか確認する．

# 使用上の注意点

-   このプログラムの使用によって生じたいかなる他の損害に対して，作者は一切責任を負いません．
-   PHP サーバーは，HTTPS 化されている必要があります．

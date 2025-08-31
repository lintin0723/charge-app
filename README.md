# Spring Boot & Vue.js 記帳應用程式

這是一個簡單的網頁記帳應用程式，使用 Spring Boot 作為後端，Vue.js 作為前端。整個應用程式透過 Docker Compose 進行容器化部署，包含應用程式本身和一個 MySQL 資料庫。

## 主要功能

*   顯示所有交易紀錄
*   新增一筆新的交易 (包含支出與收入)
*   即時計算並顯示目前帳戶餘額

## 技術棧

*   **後端**: Spring Boot, Spring Data JPA, Java 17
*   **前端**: Vue.js, HTML, CSS
*   **資料庫**: MySQL 8.0
*   **建置工具**: Maven
*   **容器化**: Docker, Docker Compose

## 環境需求

在開始之前，請確保您的電腦上已安裝以下軟體：

*   Git
*   Docker Desktop (已包含 Docker 和 Docker Compose)
*   Java 17 (用於本地建置)
*   Maven (通常內建於 IDE，或可透過 `./mvnw` 執行)

## 如何啟動專案

請依照以下步驟來啟動整個應用程式：

**1. 複製專案**

```sh
git clone <您的 GitHub 倉庫 URL>
```

**2. 進入專案目錄**

```sh
cd charge
```

**3. 使用 Maven 打包應用程式**

在專案根目錄下執行以下指令，將 Spring Boot 應用程式打包成 `.jar` 檔案。使用 `-DskipTests` 參數可以跳過測試階段，避免因本地環境沒有資料庫設定而導致建置失敗。

```sh
./mvnw package -DskipTests
```

**4. 使用 Docker Compose 啟動所有服務**

此指令會讀取 `docker-compose.yml` 檔案，自動建立並啟動應用程式容器和 MySQL 資料庫容器。

```sh
docker-compose up --build
```

`--build` 參數會確保每次啟動前都重新建置您的應用程式映像，以包含最新的程式碼變更。

**5. 開啟應用程式**

當您在終端機看到兩個服務 (db 和 app) 的日誌都穩定下來，並且看到 Spring Boot 成功啟動的訊息後，請打開您的網頁瀏覽器並訪問：

[http://localhost:8080](http://localhost:8080)

**6. 如何停止應用程式**

若要關閉所有服務，請在執行 `docker-compose up` 的終端機視窗中按下 `Ctrl + C`。

或者，您也可以打開一個新的終端機視窗，在同一個專案目錄下執行以下指令：

```sh
docker-compose down
```

## API 端點

*   `GET /api/transactions`: 獲取所有交易紀錄
*   `POST /api/transactions`: 新增一筆交易
*   `GET /api/transactions/balance`: 獲取目前餘額

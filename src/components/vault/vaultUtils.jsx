export const getAssetData = () => {
    let pallet = ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"];
    const assetDistributionData = [
        [
            "HBTC",
            {
                "percent": 30,
                "tokenId": "huobi-token",
                "currentPrice": 14.012592164177173,
                "oneDayPrice": 14.306761162959813,
                "changePercentage": -2.056153698464212,
                "timestamp": 1629339777202
            }
        ],
        [
            "ETH",
            {
                "percent": 35,
                "tokenId": "ethereum",
                "currentPrice": 3037.230251196439,
                "oneDayPrice": 3007.1440271712713,
                "changePercentage": 1.0004916210637527,
                "timestamp": 1629339778165
            }
        ],
        [
            "WBTC",
            {
                "percent": 15,
                "tokenId": "wrapped-bitcoin",
                "currentPrice": 45011.5315193287,
                "oneDayPrice": 44683.09583885416,
                "changePercentage": 0.7350334042632498,
                "timestamp": 1629339779027
            }
        ],
        [
            "DPI",
            {
                "percent": 15,
                "tokenId": "defipulse-index",
                "currentPrice": 389.0161843602312,
                "oneDayPrice": 389.1946601844362,
                "changePercentage": -0.045857726855869654,
                "timestamp": 1629339782024
            }
        ],
        [
            "DAI",
            {
                "percent": 5,
                "tokenId": "dai",
                "currentPrice": 1.0035431923037392,
                "oneDayPrice": 1.0018261540264928,
                "changePercentage": 0.1713908416490638,
                "timestamp": 1629339783164
            }
        ]
    ];


    let coinsInfo = assetDistributionData.map((coinData, index) => {
       return {
            name: coinData[0],
            percent: coinData[1].percent,
            y: coinData[1].percent,
            changePercentage: coinData[1].changePercentage.toFixed(2),
            textColorStyle: {color: coinData[1].changePercentage>0 ?'green':'red'},
            color: pallet[index],
           changeValue: (coinData[1].currentPrice * coinData[1].changePercentage).toFixed(2)
        };
    });

    return coinsInfo;
}
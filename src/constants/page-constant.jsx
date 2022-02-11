// Header title on top of page
export const HEADER_TITLE_DAOMINE = 'DAOmine';
export const HEADER_TITLE_DAOVIP_DVG = 'DAOvip (DVG)';
export const HEADER_TITLE_DAOVIP_DVD = 'DAOvip (DVD)';
export const HEADER_TITLE_INVEST = 'Invest';
export const HEADER_TITLE_PORTFOLIO = 'Portfolio';
export const HEADER_TITLE_SWAP = 'Swap';
export const HEADER_TITLE_UPGRADE = 'Upgrade'

// Path
export const INVEST_PATH = '/invest';
export const INVEST = 'INVEST';
export const PORTFOLIO_PATH = '/portfolio';
export const PORTFOLIO = 'PORTFOLIO';
export const STAKE_PATH_DVG = '/stake-dvg';
export const STAKE_PATH_DVD = '/stake-dvd';
export const STAKE = 'STAKE';
export const DAOMINE_PATH = '/daomine';
export const SWAP_PATH = '/swap';
export const SWAP = 'SWAP';
export const UPGPRADE_PATH = '/upgrade';
export const UPGPRADE = 'UPGRADE';
export const REDEEM_PATH = "/redeem";
export const REDEEM = "REDEEM";
export const PREDICTION_GAME = "PREDICTION GAME";
export const PREDICTION_GAME_PATH = "https://prediction.daoventures.co";

// Info link
export const INFO_LINK = {
    CITADEL: "https://daoventures.gitbook.io/daoventures/products/strategies/dao-citadel-vault",
    CITADELV2: "https://daoventures.gitbook.io/daoventures/products/strategies/dao-citadel-vault",
    FAANG: "https://daoventures.gitbook.io/daoventures/products/strategies/dao-stonks",
    ELON: "https://daoventures.gitbook.io/daoventures/products/strategies/elons-ape",
    CUBAN: "https://daoventures.gitbook.io/daoventures/products/strategies/cubans-ape",
    MONEY_PRINTER: "https://daoventures.gitbook.io/daoventures/products/strategies/money-printer-goes-brrrrr",
    YEARN: "https://daoventures.gitbook.io/daoventures/products/strategies/yearn-fighter",
    COMPOUND: "https://daoventures.gitbook.io/daoventures/products/strategies/compound-fighter",
    METAVERSE: "https://daoventures.gitbook.io/daoventures/products/strategies/dao-citadel-vault",
    DAODEGEN: "https://daoventures.gitbook.io/daoventures/products/strategies/dao-citadel-vault",
    DAOSAFU: "https://daoventures.gitbook.io/daoventures/products/strategies/dao-citadel-vault",
    TA: "https://daoventures.gitbook.io/daoventures/products/strategies/dao-citadel-vault"
}

export const SIDE_MENU = [
    // {key: PORTFOLIO, name: "portfolio", path: PORTFOLIO_PATH, icon: "#iconmenu_porftfolio_nor_day"},
    // {key: SWAP,name: "swap",path: SWAP_PATHicon: "#iconmenu_features_nor_night",},
    {
        key: INVEST,
        name: "invest",
        path: INVEST_PATH,
        isExternalPath: false,
        icon: "#iconmenu_porftfolio_normal_nightbeifen1",
    },
    {
        key: "GROW",
        name: "stake",
        path: "",
        icon: "#iconmenu_stake_normal_night",
        open: false,
        childrens: [
            {key: "DAOmine", name: "daomine",  isExternalPath: false, path: DAOMINE_PATH},
            {key: "DAOvip (DVG)", name: "stake-dvg", isExternalPath: false, path: STAKE_PATH_DVG},
            {key: "DAOvip (DVD)", name: "stake-dvd", isExternalPath: false, path: STAKE_PATH_DVD},
        ],
    },
    {
        key: UPGPRADE,
        name: "upgrade",
        path: UPGPRADE_PATH,
        isExternalPath: false,
        icon: "#iconmenu_revert",
    },
    {
        key: REDEEM,
        name: "redeem",
        path: REDEEM_PATH,
        isExternalPath: false,
        icon: "#iconmenu_revert",
    },
    {
        key: PREDICTION_GAME,
        name: "prediction_game",
        path: PREDICTION_GAME_PATH,
        isExternalPath: true,
        icon: "#iconmenu_game"
    }
];

export const SUB_MENU =[
    {
        title: "Your Feedback",
        path: "/user-feedback",
        link: "http://feedback.daoventures.co/beta-product-v1",
    },
    {
        title: "FAQ",
        path: "/faq",
        link: "https://daoventures.gitbook.io/daoventures/frequently-asked-question",
    },
    {
        title: "About Us",
        path: "/about-us",
        link: "https://daoventures.co/about",
    },
];

export const SOCIAL_MEDIAS = [
    [
        {icon: "#icontwitter", link: "https://twitter.com/VenturesDao"},
        {icon: "#icondiscord", link: "https://discord.com/invite/UJaCPMkb6q"},
        {icon: "#icontelegram", link: "https://t.me/DAOventures"},
        // {
        //     icon: "#iconfacebook",
        //     link: "https://www.facebook.com/DAOventuresCo/",
        // },
        // {
        //     icon: "#iconlinked",
        //     link: "https://www.linkedin.com/company/daoventuresco/",
        // },
        // {icon: "#iconmedium", link: "https://daoventuresco.medium.com/"},
    ],
    [
        // {icon: "#iconweixin1", link: ""},
        // {icon: "#iconcoinMarketCap", link: "https://coinmarketcap.com/currencies/daoventures/"},
        // {icon: "#iconcoingecko", link: "https://www.coingecko.com/en/coins/daoventures"},
    ],
    [
        // {icon: "#iconreddit", link: "https://www.reddit.com/r/DAOVentures/"},

        // {icon: "#iconemail", link: "mailto:support@daoventures.co"},
        // {
        //     icon: "#iconslack",
        //     link: "https://join.slack.com/t/daoventures/shared_invite/zt-k4hmm44g-p5ME~5I~fm0pkfY2U8AUIw",
        // },
        // {icon: "#iconweibo", link: ""},
    ],
];

export const AUDITORS = [
    [
        { name: "hacken", format: "svg"},
        { name: "certik", format: "svg"},
    ],
    [
        { name: "immunefi", format: "svg"},
        { name: "zokyo", format: "svg"},
    ]
]
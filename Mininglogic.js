// DOM Elements
const mainWalletEl = document.getElementById("mainWallet");
const rupiahWalletEl = document.getElementById("rupiahWallet");
const stockDividendsEl = document.getElementById("stockDividends");
const businessIncomeEl = document.getElementById("businessIncome");
const currentLevelEl = document.getElementById("currentLevel");
const incomeRateEl = document.getElementById("incomeRate");

// Exchange rate
const USD_TO_IDR = 15750;

// Tax rates for transfers
const TAX_RATES = {
    main_to_others: 0.02, // 2%
    others_to_main: 0.05, // 5%
    others_to_others: 0.07 // 7%
};

// Game state
let gameState = {
    money: 1000, // Start with some money
    rupiahWallet: 0,
    savingsAccount: 0,
    stockDividends: 0,
    businessIncome: 0,
    level: 1,
    baseIncome: 10,
    assets: {
        stocks: {},
        vehicles: {},
        motorcycle: {},
        realestate: {},
        industry: {},
        business: {}
    },
    upgradeCosts: [0, 100, 250, 500, 1000, 2000, 4000, 8000, 15000, 30000],
    stats: {
        totalSavingsInterest: 0,
        totalStockIncome: 0,
        totalBusinessIncome: 0
    }
};

// Asset definitions
const assetData = {
    stocks: [
        { name: "Apple Inc.", price: 180, dividend: 0.005 },
        { name: "Microsoft Corp.", price: 340, dividend: 0.004 },
        { name: "Google (Alphabet)", price: 2800, dividend: 0.003 },
        { name: "Tesla Inc.", price: 250, dividend: 0.002 },
        { name: "Amazon.com", price: 3200, dividend: 0.0025 },
        { name: "Meta Platforms", price: 310, dividend: 0.003 },
        { name: "Netflix Inc.", price: 450, dividend: 0.0035 },
        { name: "NVIDIA Corp.", price: 880, dividend: 0.002 },
        { name: "Bank Central Asia", price: 95, dividend: 0.006 },
        { name: "Telkom Indonesia", price: 45, dividend: 0.007 },
        { name: "Garuda Indonesia", price: 120, dividend: 0.004 }
    ],
    vehicles: [
        {
            name: "Lamborghini Aventador",
            price: 500000,
            image: "assets/images/vehicle/lamborghiniaventador.png"
        },
        {
            name: "Ferrari 488 GTB",
            price: 330000,
            image: "assets/images/vehicle/Ferrari488GTB.png"
        },
        {
            name: "McLaren 720S",
            price: 310000,
            image: "assets/images/vehicle/McLaren720S.png"
        },
        {
            name: "Bugatti Chiron",
            price: 3000000,
            image: "assets/images/vehicle/bugattichiron.png"
        },
        {
            name: "Rolls-Royce Phantom",
            price: 460000,
            image: "assets/images/vehicle/rollsroyce.png"
        },
        {
            name: "Toyota Fortuner",
            price: 12800,
            image: "assets/images/vehicle/fortuner.png"
        },
        {
            name: "Toyota Innova Reborn",
            price: 11500,
            image: "assets/images/vehicle/innova.png"
        },
        {
            name: "Mitsubishi Xforce",
            price: 9000,
            image: "assets/images/vehicle/xforce.png"
        },
        {
            name: "Mitsubishi Xpander",
            price: 8200,
            image: "assets/images/vehicle/expander.png"
        },
        {
            name: "Toyota Yaris",
            price: 12400,
            image: "assets/images/vehicle/yaris.png"
        },
        {
            name: "Mitsubishi L300",
            price: 9000,
            image: "assets/images/vehicle/l300.png"
        }
    ],
    motorcycle: [
        {
            name: "kawasaki ninja h2r",
            price: 46850,
            image: "assets/images/motorcycle/ninjah2r.png"
        },
        {
            name: "kawasaki ninja 400",
            price: 9000,
            image: "assets/images/motorcycle/ninja400.png"
        },
        {
            name: "Honda Pcx 2025",
            price: 2410,
            image: "assets/images/motorcycle/pcx2025.png"
        },
        {
            name: "Yamaha Nmax Turbo",
            price: 2400,
            image: "assets/images/motorcycle/nmaxturbo.png"
        },
        {
            name: "Honda Vario 125 New",
            price: 1900,
            image: "assets/images/motorcycle/Proyek Baru 23 [5C6E267].png"
        },
        {
            name: "Honda Beat Street 2025",
            price: 1100,
            image: "assets/images/motorcycle/beatstreet.png"
        },
        {
            name: "Honda Beat sporty",
            price: 1000,
            image: "assets/images/motorcycle/Beatsporty.png"
        },
        {
            name: "Yamaha Mio Sporty",
            price: 230,
            image: "assets/images/motorcycle/miosporty.png"
        }
    ],
    realestate: [
        {
            name: "Luxury Penthouse NYC",
            price: 5000000,
            image: "assets/images/Real Estate/images (15).jpeg"
        },
        {
            name: "Beverly Hills Mansion",
            price: 8500000,
            image: "assets/images/Real Estate/images (16).jpeg"
        },
        {
            name: "Miami Beach Condo",
            price: 2200000,
            image: "assets/images/Real Estate/images (17).jpeg"
        },
        {
            name: "London Townhouse",
            price: 6700000,
            image: "assets/images/Real Estate/images (18).jpeg"
        },
        {
            name: "Tokyo Skyscraper Unit",
            price: 3800000,
            image: "assets/images/Real Estate/THE_TOKYO_TOWERS_JPN_0246.jpg"
        },
        {
            name: "Dubai Marina Apartment",
            price: 1900000,
            image: "assets/images/Real Estate/images (19).jpeg"
        },
        {
            name: "Singapore Sky Villa",
            price: 4500000,
            image: "assets/images/Real Estate/images (20).jpeg"
        },
        {
            name: "Paris Luxury Loft",
            price: 3200000,
            image: "assets/images/Real Estate/images (21).jpeg"
        },
        {
            name: "Swiss Alpine Chalet",
            price: 2800000,
            image: "assets/images/Real Estate/images (22).jpeg"
        },
        {
            name: "Bali Beachfront Villa",
            price: 1200000,
            image: "assets/images/Real Estate/images (23).jpeg"
        },
        {
            name: "Monaco Oceanview Suite",
            price: 7200000,
            image: "assets/images/Real Estate/images (24).jpeg"
        }
    ],
    industry: [
        {
            name: "Tech Software Company",
            price: 2000000,
            income: 120000,
            image: "assets/images/industry/TechSoftwareCompany.jpeg"
        },
        {
            name: "Pharmaceutical Lab",
            price: 5000000,
            income: 280000,
            image: "assets/images/industry/PharmaceuticalLab.jpeg"
        },
        {
            name: "Renewable Energy Plant",
            price: 8000000,
            income: 420000,
            image: "assets/images/industry/RenewableEnergyPlant.jpeg"
        },
        {
            name: "Automotive Factory",
            price: 12000000,
            income: 650000,
            image: "assets/images/industry/AutomotiveFactory.jpeg"
        },
        {
            name: "Mining Operation",
            price: 15000000,
            income: 850000,
            image: "assets/images/industry/MiningOperation.jpeg"
        },
        {
            name: "Oil Refinery",
            price: 25000000,
            income: 1400000,
            image: "assets/images/industry/OilRefinery.jpeg"
        },
        {
            name: "Aerospace Manufacturing",
            price: 35000000,
            income: 2100000,
            image: "assets/images/industry/AerospaceManufacturing.jpeg"
        },
        {
            name: "AI Research Facility",
            price: 50000000,
            income: 3200000,
            image: "assets/images/industry/AIResearchFacility.jpeg"
        },
        {
            name: "Semiconductor Foundry",
            price: 75000000,
            income: 4800000,
            image: "assets/images/industry/SemiconductorFoundry.jpeg"
        },
        {
            name: "Space Technology Corp",
            price: 100000000,
            income: 6500000,
            image: "assets/images/industry/SpaceTechnologyCorp.jpeg"
        },
        {
            name: "Quantum Computing Lab",
            price: 150000000,
            income: 9800000,
            image: "assets/images/industry/QuantumComputingLab.jpeg"
        }
    ],
    business: [
        {
            name: "Angkringan",
            price: 200,
            income: 78,
            image: "assets/images/business/angkringan.jpeg"
        },
        {
            name: "warung madura",
            price: 256,
            income: 45,
            image: "assets/images/business/warungmadura.jpeg"
        },
        {
            name: "Pecel lele",
            price: 495,
            income: 185,
            image: "assets/images/business/pecellele.jpeg"
        },
        {
            name: "Rental PS",
            price: 500,
            income: 150,
            image: "assets/images/business/rentalps.jpeg"
        },
        {
            name: "Bengkel Motor",
            price: 540,
            income: 350,
            image: "assets/images/business/bengkelmotor.jpeg"
        },
        {
            name: "Sedot WC",
            price: 560,
            income: 210,
            image: "assets/images/business/sedotwc.jpeg"
        },
        {
            name: "Minimarket",
            price: 650,
            income: 334,
            image: "assets/images/business/minimarket.jpeg"
        },
        {
            name: "Bubur Ayam",
            price: 600,
            income: 300,
            image: "assets/images/business/buburayam.jpeg"
        },
        {
            name: "Warnet",
            price: 460,
            income: 156,
            image: "assets/images/business/warnet.jpeg"
        },
        {
            name: "Warung Kopi",
            price: 750,
            income: 400,
            image: "assets/images/business/warkop.jpeg"
        },
        {
            name: "Restoran Cepat saji",
            price: 760,
            income: 466,
            image: "assets/images/business/restorancepatsaji.jpeg"
        },
        {
            name: "Bakso Gerobak",
            price: 800,
            income: 420,
            image: "assets/images/business/bakso.jpeg"
        },
        {
            name: "Sate Madura",
            price: 950,
            income: 500,
            image: "assets/images/business/sate.jpeg"
        },
        {
            name: "Warteg",
            price: 900,
            income: 500,
            image: "assets/images/business/warteg.jpeg"
        },
        {
            name: "Warung Nasi Padang",
            price: 1000,
            income: 600,
            image: "assets/images/business/naspad.jpeg"
        },
        {
            name: "Es Teh Jumbo",
            price: 400,
            income: 150,
            image: "assets/images/business/estehjumbo.jpeg"
        },
        {
            name: "Warung Madura 24 Jam",
            price: 1200,
            income: 650,
            image: "assets/images/business/warungmadura24.jpeg"
        },
        {
            name: "Pecel Lele Lamongan",
            price: 1100,
            income: 580,
            image: "assets/images/business/Lamongan.jpeg"
        },
        {
            name: "Gorengan Pinggir Jalan",
            price: 350,
            income: 120,
            image: "assets/images/business/gorengan.jpeg"
        },
        {
            name: "Ayam Geprek",
            price: 1400,
            income: 750,
            image: "assets/images/business/ayamgeprekawokawok.jpeg"
        },
        {
            name: "Martabak Manis & Telur",
            price: 1300,
            income: 700,
            image: "assets/images/business/martabak.jpeg"
        },
        {
            name: "Toko Pulsa & Kuota",
            price: 1250,
            income: 600,
            image: "assets/images/business/konterhp.jpeg"
        },
        {
            name: "Ojek Pangkalan",
            price: 1500,
            income: 650,
            image: "assets/images/business/opang.jpeg"
        },
        {
            name: "Jasa Cuci Motor",
            price: 1600,
            income: 800,
            image: "assets/images/business/jasacucimotor.jpeg"
        },
        {
            name: "Fotokopian",
            price: 1700,
            income: 850,
            image: "assets/images/business/fotocopy.jpeg"
        },
        {
            name: "Rental PS & Warnet",
            price: 1800,
            income: 900,
            image: "assets/images/business/warnet24ps.jpeg"
        },
        {
            name: "Percetakan Undangan",
            price: 2200,
            income: 1100,
            image: "assets/images/business/cetakundangan.jpeg"
        },
        {
            name: "Jasa Sedot WC",
            price: 2100,
            income: 1050,
            image: "assets/images/business/sedotwc25.jpeg"
        },
        {
            name: "Konter HP & Service",
            price: 2800,
            income: 1400,
            image: "assets/images/business/servicehp.jpeg"
        },
        {
            name: "Toko Kelontong",
            price: 2000,
            income: 1000,
            image: "assets/images/business/kelontong.jpeg"
        },
        {
            name: "Pasar Tradisional Kios",
            price: 5000,
            income: 2500,
            image: "assets/images/business/kioskois.jpeg"
        },
        {
            name: "Penyedia Lapak",
            price: 35000,
            income: 3000,
            image: "assets/images/business/penyedialapak.jpeg"
        },
        {
            name: "Rental Mobil",
            price: 24500,
            income: 9870,
            image: "assets/images/business/rentalmobil.jpeg"
        },
        {
            name: "Bengkel Mobil",
            price: 89000,
            income: 8500,
            image: "assets/images/business/bengkelmobil.jpeg"
        },
        {
            name: "Koprasi Simpan Pinjam",
            price: 100000,
            income: 58700,
            image: "assets/images/business/koprasi.jpeg"
        },
        {
            name: "Toko Emas",
            price: 150000,
            income: 76000,
            image: "assets/images/business/tokoemas.jpeg"
        }
    ]
};

// Initialize asset grids
function initAssetGrids() {
    Object.keys(assetData).forEach(category => {
        const grid = document.getElementById(category + "Grid");
        assetData[category].forEach((asset, index) => {
            const assetEl = document.createElement("div");
            assetEl.className = "asset-item";

            let imageHtml = "";
            if (asset.image) {
                imageHtml = `<img src="${asset.image}" alt="${asset.name}" class="asset-image" onerror="this.style.display='none'">`;
            }

            assetEl.innerHTML = `
                        ${imageHtml}
                        <div class="asset-name">${asset.name}</div>
                        <div class="asset-price">$${asset.price.toLocaleString()}</div>
                        <div class="asset-income">${getAssetIncomeText(
                            category,
                            asset
                        )}</div>
                        <div class="asset-owned">Owned: <span id="${category}_${index}_owned">0</span></div>
                        <button class="buy-btn" onclick="buyAsset('${category}', ${index})">Buy Asset</button>
                    `;
            grid.appendChild(assetEl);
        });
    });
}

function getAssetIncomeText(category, asset) {
    if (category === "stocks") {
        return `Dividend: ${(asset.dividend * 100).toFixed(2)}%/sec`;
    } else if (category === "industry" || category === "business") {
        return `Income: $${asset.income.toLocaleString()}/sec`;
    } else {
        return `Passive: 3%/sec`;
    }
}

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    // Show selected tab
    document.getElementById(tabName).classList.add("active");
    event.target.classList.add("active");
}

function buyAsset(category, index) {
    const asset = assetData[category][index];
    // Only allow purchases from main wallet
    if (gameState.money >= asset.price) {
        gameState.money -= asset.price;

        if (!gameState.assets[category][index]) {
            gameState.assets[category][index] = 0;
        }
        gameState.assets[category][index]++;

        updateUI();
        updateAssetDisplay(category, index);
    }
}

function updateAssetDisplay(category, index) {
    const ownedEl = document.getElementById(`${category}_${index}_owned`);
    const owned = gameState.assets[category][index] || 0;
    ownedEl.textContent = owned;
}

function calculatePassiveIncome() {
    let totalPassive = 0;
    let stockDividendIncome = 0;
    let businessIncomeTotal = 0;

    Object.keys(gameState.assets).forEach(category => {
        Object.keys(gameState.assets[category]).forEach(index => {
            const owned = gameState.assets[category][index];
            const asset = assetData[category][index];

            if (owned > 0) {
                if (category === "stocks") {
                    stockDividendIncome += asset.price * asset.dividend * owned;
                } else if (category === "industry" || category === "business") {
                    businessIncomeTotal += asset.income * owned;
                } else {
                    totalPassive += asset.price * 0.03 * owned;
                }
            }
        });
    });

    return {
        totalPassive,
        stockDividendIncome,
        businessIncomeTotal
    };
}

function getCurrentIncome() {
    const { totalPassive, stockDividendIncome, businessIncomeTotal } =
        calculatePassiveIncome();
    const miningIncome = gameState.baseIncome + (gameState.level - 1);
    return (
        miningIncome + totalPassive + stockDividendIncome + businessIncomeTotal
    );
}

function convertToRupiah() {
    const usdAmount = parseFloat(document.getElementById("usdAmount").value);
    if (usdAmount > 0 && gameState.money >= usdAmount) {
        gameState.money -= usdAmount;
        gameState.rupiahWallet += usdAmount * USD_TO_IDR;
        document.getElementById("usdAmount").value = "";
        updateUI();
    }
}

function convertToUSD() {
    const idrAmount = parseFloat(document.getElementById("idrAmount").value);
    if (idrAmount > 0 && gameState.rupiahWallet >= idrAmount) {
        gameState.rupiahWallet -= idrAmount;
        gameState.money += idrAmount / USD_TO_IDR;
        document.getElementById("idrAmount").value = "";
        updateUI();
    }
}

function transferSavingsToRupiah() {
    const amount = parseFloat(document.getElementById("savingsTransferAmount").value);

    if (amount > 0 && gameState.savingsAccount >= amount) {
        // Kurangi dari tabungan
        gameState.savingsAccount -= amount;

        // Tambahkan ke rupiah wallet
        gameState.rupiahWallet += amount;

        // Kosongin input biar rapih
        document.getElementById("savingsTransferAmount").value = "";

        // Update UI biar keliatan langsung
        updateUI();
    } else {
        alert("Saldo tidak cukup atau jumlah tidak valid!");
    }
}

function formatMoney(amount, currency = "USD") {
    if (currency === "USD") {
        return "$" + Math.floor(amount).toLocaleString();
    } else {
        return "Rp " + Math.floor(amount).toLocaleString();
    }
}

function updateUI() {
    mainWalletEl.textContent = formatMoney(gameState.money);
    rupiahWalletEl.textContent = formatMoney(gameState.rupiahWallet, "IDR");
    document.getElementById("savingsAccount").textContent = formatMoney(
        gameState.savingsAccount,
        "IDR"
    );
    stockDividendsEl.textContent = formatMoney(gameState.stockDividends);
    businessIncomeEl.textContent = formatMoney(gameState.businessIncome);
    currentLevelEl.textContent = gameState.level;
    incomeRateEl.textContent = `+${formatMoney(getCurrentIncome())}/detik`;

    // Update upgrade info
    if (gameState.level < 10) {
        const nextLevel = gameState.level + 1;
        const upgradeCost = gameState.upgradeCosts[nextLevel - 1];
        document.getElementById("nextLevel").textContent = nextLevel;
        document.getElementById("nextIncome").textContent =
            gameState.baseIncome + (nextLevel - 1);
        document.getElementById("upgradeCost").textContent =
            upgradeCost.toLocaleString();

        const upgradeBtn = document.getElementById("upgradeBtn");
        if (gameState.money >= upgradeCost) {
            upgradeBtn.disabled = false;
            upgradeBtn.textContent = "Upgrade Level";
        } else {
            upgradeBtn.disabled = true;
            upgradeBtn.textContent = `Need ${formatMoney(
                upgradeCost - gameState.money
            )} more`;
        }
    }

    // Update asset ownership displays
    Object.keys(gameState.assets).forEach(category => {
        Object.keys(gameState.assets[category]).forEach(index => {
            updateAssetDisplay(category, parseInt(index));
        });
    });

    // Update buy buttons - only check main wallet since all purchases are from main wallet
    Object.keys(assetData).forEach(category => {
        assetData[category].forEach((asset, index) => {
            const buyBtn = document.querySelector(
                `button[onclick="buyAsset('${category}', ${index})"]`
            );
            if (buyBtn) {
                buyBtn.disabled = gameState.money < asset.price;
            }
        });
    });
}

function toggleStats() {
    const panel = document.getElementById("statsPanel");
    panel.classList.toggle("active");
    updateStatsUI();
    // Tutup stats panel kalau klik di luar
    document.addEventListener("click", function (event) {
        const panel = document.getElementById("statsPanel");
        const menuBtn = document.querySelector(".stats-btn");

        // Kalau panel lagi aktif dan klik bukan di panel atau tombol
        if (
            panel.classList.contains("active") &&
            !panel.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            panel.classList.remove("active");
        }
    });
}

function updateStatsUI() {
    document.getElementById("statsSavings").textContent = formatMoney(
        gameState.stats.totalSavingsInterest,
        "IDR"
    );
    document.getElementById("statsStock").textContent = formatMoney(
        gameState.stats.totalStockIncome
    );
    document.getElementById("statsBusiness").textContent = formatMoney(
        gameState.stats.totalBusinessIncome
    );
}

function upgradeLevel() {
    if (gameState.level >= 10) return;

    const nextLevel = gameState.level + 1;
    const upgradeCost = gameState.upgradeCosts[nextLevel - 1];

    if (gameState.money >= upgradeCost) {
        gameState.money -= upgradeCost;
        gameState.level = nextLevel;
        updateUI();
    }
}

function gameTick() {
    const { totalPassive, stockDividendIncome, businessIncomeTotal } =
        calculatePassiveIncome();
    const miningIncome = gameState.baseIncome + (gameState.level - 1);

    // Add to respective wallets
    gameState.money += miningIncome + totalPassive;
    gameState.stockDividends += stockDividendIncome;
    gameState.businessIncome += businessIncomeTotal;

    gameState.stats.totalStockIncome += stockDividendIncome;
    gameState.stats.totalBusinessIncome += businessIncomeTotal;

    // ✅ Bunga tabungan
    if (gameState.savingsAccount > 0) {
        const interest = gameState.savingsAccount * 0.001;
        gameState.savingsAccount += interest;
        gameState.stats.totalSavingsInterest += interest;
    }

    updateUI();
}

function autoTransferToMain() {
    // Transfer Stock Dividends
    if (gameState.stockDividends > 0) {
        gameState.money += gameState.stockDividends;
        gameState.stockDividends = 0;
    }

    // Transfer Business Income
    if (gameState.businessIncome > 0) {
        gameState.money += gameState.businessIncome;
        gameState.businessIncome = 0;
    }

    updateUI();
    updateStatsUI();
}

function autoSaveToSavings() {
    if (gameState.rupiahWallet > 0) {
        // Ambil 65% dari saldo rupiah wallet
        const amountToSave = gameState.rupiahWallet * 0.65;

        // Kurangi dari rupiah wallet
        gameState.rupiahWallet -= amountToSave;

        // Tambahin ke rekening
        gameState.savingsAccount += amountToSave;

        updateUI();
        console.log(
            "Auto Savings: Rp",
            Math.floor(amountToSave).toLocaleString()
        );
    }
}

function saveGame() {
    localStorage.setItem("investmentEmpireSave", JSON.stringify(gameState));
}

function loadGame() {
    const savedData = localStorage.getItem("investmentEmpireSave");
    if (savedData) {
        gameState = {
            ...gameState,
            ...JSON.parse(savedData)
        };
    }
}

// Initialize game
loadGame();
initAssetGrids();
updateUI();
setInterval(gameTick, 1000);
setInterval(saveGame, 5000);
setInterval(autoTransferToMain, 30000);
setInterval(autoSaveToSavings, 100000);

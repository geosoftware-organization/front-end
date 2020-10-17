import wixData from "wix-data";


$w.onReady(function () {
	loadAssetAllocationData()
    $w("#html1").onMessage((event) => {
		// Action when click on some of the assets
        if (event.data.type === 'click') {
            console.log("Change value ..")
        }
    });
});

function loadAssetAllocationData() {
	var result = []
	var obj_assets = {
        'Crypto': 0,
        'Forex': 0,
        'Shares': 0,
        'Commodities': 0
    }
    wixData
		.query('AssetAllocation')
        .find()
        .then(res => {
            res.items.forEach(item => {
                if (item.title) {
                    obj_assets[item.title] = item.percentage
                }
            })
			result.push(obj_assets[Object.keys(obj_assets)[0]])
			result.push(obj_assets[Object.keys(obj_assets)[1]])
			result.push(obj_assets[Object.keys(obj_assets)[2]])
			result.push(obj_assets[Object.keys(obj_assets)[3]])
            
            $w("#html1").postMessage([...result])
        })
}
export const parsePolicy = (policyJSON) => {
    const policies = Object.keys(policyJSON);
    const policyArray = [];

    policies.forEach( policyKey => {
        if (policyKey !== 'jcr:primaryType') {

            let policy = policyJSON[policyKey];
            let styleGroups = policy['cq:styleGroups'];
            let policyObject = {
                tabName: policy['jcr:title'], 
                tabDescription: policy['jcr:description'],
                styleGroups: []
            };

            let styleGroupKeys = Object.keys(styleGroups);

            if (styleGroupKeys.length) {

                styleGroupKeys.map( styleKey => {
                    if (styleKey !== 'jcr:primaryType') {
                        let styleGroup = styleGroups[styleKey];
                        let stylesKeys = Object.keys(styleGroup['cq:styles']);
                        let stylesArray = [];
                        stylesKeys.forEach( optionKey => {
                            let option = styleGroup['cq:styles'][optionKey];
                            if (optionKey !== 'jcr:primaryType') {
                                stylesArray.push({
                                    classes: option['cq:styleClasses'],
                                    label: option['cq:styleLabel']
                                });
                            }
                        })

                        if (stylesKeys.length) {
                            policyObject.styleGroups.push({
                                styleGroupLabel: styleGroup['cq:styleGroupLabel'],
                                styleGroupMultiple: styleGroup['cq:styleGroupMultiple'] || false,
                                styles: stylesArray
                            });
                        }
                    }
                });
            }

            policyArray.push(policyObject);
        }
    });

    return policyArray;
}
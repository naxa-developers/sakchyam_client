export default () => {
  self.addEventListener('message', e => {
    // eslint-disable-line no-restricted-globals
    if (!e) return;
    const {
      minmax,
      finalchoroplethData,
      partnershipAllData,
      fedtype,
    } = e.data;

    // const final = test[0] + test[1];
    let Output = null;
    function CaculateCount(date, finalData, api, fedType) {
      const startDate = date[0];
      const endDate = date[1];
      //
      //
      //
      const ProjectIdList = [];
      finalData.map((prov, i) => {
        //

        api.map(data => {
          let idString = data.province_id;
          if (fedType === 'municipality') {
            idString = data.municipality_id;
          } else if (fedType === 'district') {
            idString = data.district_id;
          } else {
            idString = data.province_id;
          }
          const parsedDate = Date.parse(data.start_date);
          if (prov.id === idString) {
            if (
              !ProjectIdList.includes(
                data.project_id + data.province_id,
              )
            ) {
              if (parsedDate >= startDate && parsedDate < endDate) {
                //
                //
                // eslint-disable-next-line no-param-reassign
                finalData[i].count += 1;
              }
            }
            //
            //
            //
            //
            //
            //
          }
          if (!ProjectIdList.includes(data.project_id)) {
            ProjectIdList.push(data.project_id + data.province_id);
          }
          return true;
        });
        return true;
      });
      Output = finalData;
    }
    CaculateCount(
      minmax,
      finalchoroplethData,
      partnershipAllData,
      fedtype,
    );
    postMessage(Output);
  });
};

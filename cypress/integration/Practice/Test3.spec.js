cy.fixture('FF_ViewAllActiveSites_20180503_102650').then((sites) => {
    cy.request({
      url: '/api/sites',
      method: 'post',
      form: true,
      headers: {
        'content-type': 'multipart/form-data',
      },
      files: {
        file: sites
      }

    }).then((res) => {
      console.log(res);
    })
  })
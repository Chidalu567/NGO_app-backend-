const { base } = require('../utils/airtable_config');

exports.Gallery = (req, res) => {
    base('Gallery').select({ view: 'Grid view' }).firstPage((err, records) => {
        if (err) {
            console.error(err);
        }
        const gallery = [];
        records.forEach((record) => {
            gallery.push(record.fields);
        })
        if (gallery != null) {
            res.status(200).json({msg:'Gallery Item fetched',gallery:gallery})
        }
    });

}
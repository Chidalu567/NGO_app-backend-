const { base } = require('../utils/airtable_config');
const { cloudinary } = require('../utils/cloudinary_config');

exports.galleryHandler = async (req, res) => {
    const { title, description, date, file } = req.body;
    console.log("from secret route gallery",req.user)
    // create and upload image to the cloud -> cloudinary -> folder(spam_gallery)
    try {
        const uploadFile = await cloudinary.uploader.upload(file, { upload_preset: 'ngo-admin-preset' });
        console.log(uploadFile.public_id);

        // store the title, description, date, public_id in airtable
        base('Gallery').create([
            {
                'fields':{'Title':title,'Description':description,'Date':date,'Public_Id':uploadFile.public_id}
            },
        ],
            function (err, records) {
                if (err) {
                    console.error(err);
                }
                records.forEach((record) => {
                    console.log(record);
                })
            }
        )

    } catch (err) {
        console.log(err);
    }

    res.status(200).json({ msg: 'Request recieved' }); // send response to client
}
const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings});
  };

  module.exports.renderNewForm = (req, res) =>{
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews", populate: {path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error", "Listing Not Found");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });

};

const defaultImage = "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60";

module.exports.createListing = async (req, res) => {
    const listingData = req.body.listing;
    const imageUrl = listingData.image?.url?.trim() || defaultImage;

    const newListing = new Listing({
        ...listingData,
        image: {
            url: imageUrl,
            filename: "",
        },
        owner: req.user._id,
    });

    await newListing.save();
    req.flash("success", "New Listing created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing Not Found");
        return res.redirect("/listings");
    } 

    res.render("listings/edit.ejs", {listing});

};

module.exports.updateListing = async(req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async(req, res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    
    res.redirect("/listings");
    };

    

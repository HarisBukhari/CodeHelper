const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('connect-flash')

//Session

///////////////EJS Side

    //For EJS include
///    <%- include('../partials/flash')%>
    
        //For EJS File
// <% if(success && success.length) {%>
//     <div class="alert alert-success alert-dismissible fade show" role="alert">
//         <%= success %>
//         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//             <span aria-hidden="true">&times;</span>
//         </button>
//     </div>
//     <% } %>
    
//     <% if(error && error.length) {%>
//     <div class="alert alert-danger alert-dismissible fade show" role="alert">
//         <%= error %>
//         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//             <span aria-hidden="true">&times;</span>
//         </button>
//     </div>
//     <% } %>





//Setting Up the session with key and defining session expiration time
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    //Memory Storage 
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(session(sessionConfig))
app.use(flash());


app.use((req, res, next) => {
    //Defining Two scenarios 
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//Routes side implementation Success and Error Flash
app.post('/',validateCampground,catchAsync(async(req,res)=>{
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground)
    await campground.save()
    req.flash('success', 'Successfully made a new Campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}))


app.get('/:id/edit',catchAsync(async(req,res)=>{
    const campground =await Campground.findById(req.params.id)
    if (!campground) {
      req.flash('error', 'Cannot find that campground!')
      return res.redirect('/campgrounds')
  }
    res.render('campground/edit',{campground})
}))
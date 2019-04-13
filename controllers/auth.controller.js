function AuthController() {
    var roles;
    var user;

    function setUser(inUser) {
        user = inUser;
    }

    function setRoles(role) {
        roles = role;
        user.roles = role;
    }

    function isAuthorized(neededRole) {
        // return roles.indexOf(neededRole) >= 0;
        if(user) {
            return user.isAuthorized(neededRole);
        }
    }

    function isAuthorizedAsync (neededRole, callback) {
        setTimeout(() => { callback(roles.indexOf(neededRole) >= 0) }, 0);
    }

    function isAuthorizedPromise(neededRole, callback) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(roles.indexOf(neededRole) >= 0)
            }, 0);
        });
    }

    function getIndex(req, res) {
        try{
            if(req.user.isAuthorized('admin')){
                return res.render('index');
            }   
            res.render('notAuth');
        } catch(e) {
            res.render('error');
        }
        
    }

    return {
        setRoles,
        isAuthorized,
        isAuthorizedAsync,
        isAuthorizedPromise,
        getIndex,
        setUser
    };
}

module.exports = AuthController();
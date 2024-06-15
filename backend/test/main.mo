import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Result "mo:base/Result";
import Bool "mo:base/Bool";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
actor {
    type Profile = {
        username : Text;
        bio : Text;
    };
    type Sitio={
        sitioPrincipal : Principal;
        nombre: Text;
        descripcion: Text;
        imagen: Text;
    };
    var sitios = HashMap.HashMap<Nat, Sitio>(1, Nat.equal, Hash.hash);
    stable var postIdCount : Nat = 0;
    public func createPost (post : Sitio) : async () {

        //1. auth

        //2. Prepare data.
        let id : Nat = postIdCount;
        postIdCount+=1;

        //3. Create Post.
        sitios.put(id, post);

        //4. return confirmation.
        ();


    };
    public query func readPost (id : Nat) : async ?Sitio {

        // 1. Auth

        //2. Query data.
        let postRes : ?Sitio = sitios.get(id);

        //3. Return requested Post or null.
        postRes;

    };
    public query func readAllPosts () : async [(Nat, Sitio)] {
        //1. authenticate

        //2. Hashmap to Iter.
            let postsIter : Iter.Iter<(Nat, Sitio)> = sitios.entries();
            
        //3. Iter to Array.
            let postsArray : [(Nat, Sitio)] = Iter.toArray(postsIter);

        //4. Iter to Array.
            postsArray;
    };

    type GetProfileError = {
        #userNotAuthenticated;
        #profileNotFound;
    };
    type GetSitioError = {
        #sitioRepetido;
        #sinPermisos;
    };
    type GetSitioResponse = Result.Result<Sitio, GetSitioError>;
    type GetProfileResponse = Result.Result<Profile, GetProfileError>;
    type SaveSitioResponse = Result.Result<Bool, Text>;
   
    
    
    type CreateProfileError = {
        #profileAlreadyExists;
        #userNotAuthenticated;
    };


    type CreateProfileResponse = Result.Result<Bool, CreateProfileError>;

    let profiles = HashMap.HashMap<Principal, Profile>(0, Principal.equal, Principal.hash);

    public query ({caller}) func getProfile () : async GetProfileResponse {
        //if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

        let profile = profiles.get(caller);

        switch profile {
            case (?profile) {
                #ok(profile);
            };
            case null {
                #err(#profileNotFound);
            };
        }
    };

    public shared ({caller}) func createProfile (username : Text, bio : Text) : async CreateProfileResponse {
       // if (Principal.isAnonymous(caller)) return #err(#userNotAuthenticated);

        let profile = profiles.get(caller);

        if (profile != null) return #err(#profileAlreadyExists);

        let newProfile: Profile = {
            username = username;
            bio = bio;
        };
        
        profiles.put(caller, newProfile);

        #ok(true);
    };
}

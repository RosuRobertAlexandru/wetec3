function bowdlerize(input, dictionary){
    if(typeof input != 'string'){
        throw("Input should be a string")
    }else{
        let ok=true;
        for(let string of dictionary){
            if(typeof string != 'string')
                ok=false;
        }
        if(ok===false){
            throw("Invalid dictionary format")
        }else{
            let newinput=input;
            
            dictionary.forEach(string=>{
                if(input.toLowerCase().indexOf(string.toLowerCase())!=-1){
                    let index=input.toLowerCase().indexOf(string.toLowerCase())
                    let word=input.substring(index,index+string.length)
                    
                    let newword="";
                    newword+=word[0];
                    
                    for(let i=1;i<word.length-1;i++){
                        newword+="*"
                    }
                    newword+=word[word.length-1];

                    var pattern = new RegExp(word, 'gi');

                    newinput=newinput.replace(pattern,newword);

                }
            })
            return newinput

        }
    }

    
 }

const app = {
    bowdlerize
};

module.exports = app;
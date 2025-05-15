function validateSenha(senha){
    if(senha==""){
        throw new Error("Digite sua senha!")
    }
}

module.exports = {validateSenha};
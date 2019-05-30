pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract IdentitiesChain {

    struct Usuario{
        string usuario;
        string clave;
        Cedula cedula;
        Documento[] docs;
        Permiso[] permisos;
    }

    struct Cedula{
        string nombre;
        string fecha;
        string sexo;
        string ciudad;
        string departamento;
        string url;
    }

    struct Documento{
        string nombre;
        string url;
        string hash;
    }

    struct Permiso{
        address duenio;
        Documento[] docs;
    }

    string usuarioActivo;
    mapping(string => Usuario) usuarios;
    mapping(string => Permiso) permisos;
    mapping(string => Documento) documentos;

   constructor() public {}

   function iniciarSesion(string memory _usuario, string memory _clave, string memory sender) public returns(bool){
       require(keccak256(abi.encodePacked((usuarios[sender].usuario))) == keccak256(abi.encodePacked((_usuario))) && keccak256(abi.encodePacked((usuarios[sender].clave))) == keccak256(abi.encodePacked((_clave))) );
       usuarioActivo = sender;
       return true;
   }

   function nuevoUsuario(string memory _usuario, string memory _clave, string memory sender) public returns(string memory){
        usuarios[sender].usuario = _usuario;
        usuarios[sender].clave = _clave;
        usuarioActivo = sender;
        return usuarioActivo;
    }

    function getUsuario() public view returns(string memory) {
        return usuarios[usuarioActivo].usuario;
    }

    function nuevaCedula(string memory _nombre, string memory _fecha, string memory _sexo, string memory _ciudad, string memory _departamento, string memory _url) public {

        //Cedula memory _cedula = usuarios[usuarioActivo].cedula;
        usuarios[usuarioActivo].cedula.nombre = _nombre;
        usuarios[usuarioActivo].cedula.fecha = _fecha;
        usuarios[usuarioActivo].cedula.sexo = _sexo;
        usuarios[usuarioActivo].cedula.ciudad = _ciudad;
        usuarios[usuarioActivo].cedula.departamento = _departamento;
        usuarios[usuarioActivo].cedula.url = _url;
    }

    event Cedulita(
        string nombre,
        string fecha,
        string sexo,
        string ciudad,
        string departamento,
        string url,
        string adr
    );

    function getCedula(string memory dir) public returns(string memory, string memory, string memory, string memory, string memory, string memory, string memory){
        //Cedula memory _cedula = usuarios[usuarioActivo].cedula;
        emit Cedulita(usuarios[usuarioActivo].cedula.nombre, usuarios[usuarioActivo].cedula.fecha, usuarios[usuarioActivo].cedula.sexo,
         usuarios[usuarioActivo].cedula.ciudad, usuarios[usuarioActivo].cedula.departamento, usuarios[usuarioActivo].cedula.url, usuarioActivo);
    }

    function nuevoDocumento(string memory _nombre, string memory _url, string memory _hash, string memory _idDoc) public {
        documentos[_idDoc].nombre = _nombre;
        documentos[_idDoc].url = _url;
        documentos[_idDoc].hash = _hash;
        usuarios[usuarioActivo].docs.push(documentos[_idDoc]);
    }

    event Documentos(
        Documento docs
    );

    function getDocumentos() public returns(string memory, uint){
      for(uint i=0; i<usuarios[usuarioActivo].docs.length; i++){
          emit Documentos(usuarios[usuarioActivo].docs[i]);
      }
    }

    function compartir(string memory _destinatario, string memory _idDocs, string memory idPermiso) public {

        permisos[idPermiso].duenio = msg.sender;
        permisos[idPermiso].docs.push(documentos[_idDocs]);
        usuarios[_destinatario].permisos.push(permisos[idPermiso]);
    }

    event Permisos(
        Permiso[] perms
    );

    function getPermisos() public returns(Permiso[] memory p){
        emit Permisos(usuarios[usuarioActivo].permisos);
    }

}

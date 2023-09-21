import RolesUserEnum from "../states/login/enum/roles_enum";

export default class UserModel {
    constructor({ id, email, token, role, isLogged }) {
      this.id = id;
      this.email = email;
      this.token = token;
      this.role = role;
      this.isAdmin = this.role === RolesUserEnum.Admin;
      this.isLogged = isLogged
    }
}
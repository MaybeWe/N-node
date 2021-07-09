import { createCipheriv, randomBytes, scrypt, createDecipheriv, createHash } from 'crypto';
import { promisify } from 'util';

// 初始化参数

export class Encrypt  {

    async encode(params: any = {}): Promise<object> {
        // const cipher = createCipheriv(algorithm, key, iv); // 初始化加密算法
        // let encrypted = cipher.update(password, 'utf8', 'hex');
        // encrypted += cipher.final('hex');
        // const tag = cipher.getAuthTag(); // 生成标签，用于验证密文的来源
        // console.log(encrypted)

        // const decipher = createDecipheriv(algorithm, key, iv); // 初始化解密算法
        // decipher.setAuthTag(tag); // 传入验证标签，验证密文的来源
        // let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        // decrypted += decipher.final('utf8');
        // console.log(decrypted)
        const iv = params.code ? params.code: randomBytes(16).toString('hex');
        let md5 = createHash("md5");
        let pass = md5.update(params.password+iv).digest("hex");
        return {password: pass, code: iv};
      // return await this.usersService.create(params);
    }

    async decode(params: object): Promise<string>{
        return "d";
    }
}
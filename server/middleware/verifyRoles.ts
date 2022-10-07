export const verifyRoles = (...allowedRoles: string[]) => {
    return (req: any, res: any, next: () => void) => {        
        if (!req?.roles) return res.sendStatus(401)

        const rolesArray = [...allowedRoles];        
        const result = req.roles.map((role: string) => rolesArray.includes(role)).find((val: boolean) => val === true)

        if (!result) return res.sendStatus(401)
        next()
    }
}
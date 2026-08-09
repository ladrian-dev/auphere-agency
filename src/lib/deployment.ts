/**
 * En qué entorno corre este despliegue.
 *
 * Existe por una razón concreta: `landing-staging.auphere.com` sirve la rama
 * `develop` en una URL pública. Sin distinguir el entorno, esa URL se indexa,
 * compite en Google con auphere.com por el mismo contenido y deja de ser
 * interna en cuanto alguien la enlaza.
 *
 * Regla de decisión, en orden:
 *  1. `NEXT_PUBLIC_DEPLOY_ENV` si está definida — el override manual manda.
 *  2. `VERCEL_ENV`, que Vercel rellena solo: 'production' en el dominio de
 *     producción, 'preview' en cualquier rama (incluida `develop`, aunque
 *     tenga dominio propio).
 *  3. Sin ninguna de las dos (local, self-host): NO es producción.
 *
 * El sesgo del paso 3 es deliberado. Un fallo de configuración debe terminar en
 * un sitio que no se indexa, nunca en un staging indexado.
 */

export type DeployEnv = 'production' | 'staging' | 'development';

export function deployEnv(): DeployEnv {
  const explicit = process.env.NEXT_PUBLIC_DEPLOY_ENV;
  if (explicit === 'production') return 'production';
  if (explicit === 'staging') return 'staging';
  if (explicit === 'development') return 'development';

  switch (process.env.VERCEL_ENV) {
    case 'production':
      return 'production';
    case 'preview':
      return 'staging';
    default:
      return 'development';
  }
}

/** True solo en el despliegue que sirve auphere.com. */
export function isProduction(): boolean {
  return deployEnv() === 'production';
}

/**
 * True cuando el despliegue es visible en internet pero no es producción.
 * Es el caso que hay que proteger: indexable si nadie lo impide.
 */
export function isPubliclyReachableNonProduction(): boolean {
  return deployEnv() === 'staging';
}

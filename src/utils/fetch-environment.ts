import { fetchEnvironments } from '../services/vercel';

const fetchEnvironment = async (key: string) => {
  const { data } = await fetchEnvironments();
  return data.envs.find((env: any) => env.key === key);
};

export default fetchEnvironment;

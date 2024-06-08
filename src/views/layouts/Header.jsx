import reactLog from '../../assets/react.svg';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// eslint-disable-next-line react/prop-types
const Header = ({ imgSrc, title, userInfo = { id: 0, name: '使用者' }, logoutHandler }) => {
    
    const log = imgSrc || reactLog;

    return (
    <>
        <header className='w-full h-14 bg-blue-500 text-zinc-100 shadow'>
            <div className='flex p-1 pt-2'>
                <img className='ml-1 p-1' src={log} />
                <h1 className='ml-1 p-1 font-bold text-xl'>{title || 'React App'}</h1>
                <Stack direction="row" spacing={1} sx={{ marginLeft: 'auto', marginRight: '5px' }}>
                    <Avatar src="/broken-image.jpg" sx={{ width: 35, height: 35 }} />
                    <Typography variant="h5" className='pt-1' sx={{ fontSize: '1.25rem',lineHeight: '1.75rem' }}>
                        {userInfo.name}
                    </Typography>
                </Stack>
                <Button variant="contained" color="secondary" sx={{marginLeft: '10px', marginRight: '10px'}} onClick={logoutHandler}>登出</Button>
            </div>
        </header>
    </>);
}

export default Header;
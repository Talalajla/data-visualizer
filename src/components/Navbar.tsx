import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, List, ListItem, ListItemText, MenuItem, Select, SelectChangeEvent, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material';
import { theme } from '../theme/theme';
import MenuIcon from "@mui/icons-material/Menu";

const CustomList = styled(List)({
    height: '100%',
    backgroundColor: theme.palette.background.default,
    padding: '0 40px',

    'a': {
        textDecoration: 'none',
        color: theme.palette.text.primary,
        fontWeight: 300,
    },
    'li': {
        padding: '10px 0',
        letterSpacing: '0.8px',
    },
    '.list-title span': {
        fontWeight: 500
    }
});

const Navbar = () => {
    const [language, setLanguage] = useState<string>('pl');
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const { t, i18n } = useTranslation();

    const handleLanguageChange = (e: SelectChangeEvent<string>) => {
        const lang = e.target.value;
        setLanguage(lang);
        i18n.changeLanguage(lang);
    }

    const handleLanguageClick = (lang: string) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);
        setOpenDrawer(false)
    }


    return (
        <AppBar>
            <Container>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant='h6'>
                        <Link to='/' style={{ textDecoration: 'none' }}><span style={{ color: '#fff' }}>&#60; data-visualizer &#47;&#62;</span></Link>
                    </Typography>
                    <Box sx={{ '@media(max-width: 768px)': { display: 'none' }, '>*': { padding: '0 10px' } }}>
                        <Select sx={{
                            color: 'background.default',
                            'fieldset': {
                                border: 'none',
                            },
                            '& svg': {
                                color: 'background.default',
                            },
                            '&:focus': {
                                boxShadow: 'none'
                            }
                        }}
                            defaultValue='pl'
                            labelId='language-select-label'
                            id='language-select'
                            value={language}
                            onChange={handleLanguageChange}
                        >
                            <MenuItem value='en'>
                                <span role='img' aria-label='English'>🇬🇧 {t('navbar.language.english')}</span>
                            </MenuItem>
                            <MenuItem value='pl'>
                                <span role='img' aria-label='Polish'>🇵🇱 {t('navbar.language.polish')}</span>
                            </MenuItem>
                        </Select>
                        <Button component={NavLink} to='/main' color='inherit'>{t('navbar.main')}</Button>
                        <Button component={NavLink} to='/views' color='inherit'>{t('navbar.views')}</Button>
                    </Box>
                    <Box sx={{ display: 'none', '@media(max-width: 768px)': { display: 'block' } }}>
                        <IconButton onClick={() => setOpenDrawer(true)}>
                            <MenuIcon sx={{ color: '#fff' }} />
                        </IconButton>
                    </Box>
                    <Drawer open={openDrawer} anchor='right' onClose={() => setOpenDrawer(false)}>
                        <CustomList>
                            <ListItem className='list-title'>
                                <span>{t('navbar.pages')}</span>
                            </ListItem>
                            <Divider />
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    <Link to='/main' >{t('navbar.main')}</Link>
                                </ListItemText>
                            </ListItem>
                            <ListItem onClick={() => setOpenDrawer(false)}>
                                <ListItemText>
                                    <Link to='/views'>{t('navbar.view')}</Link>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem className='list-title'>
                                <span>{t('navbar.language')}</span>
                            </ListItem>
                            <ListItem onClick={() => handleLanguageClick('pl')}>
                                <span role='img' aria-label='Polish' style={{ cursor: 'pointer' }}>🇵🇱 PL</span>
                            </ListItem>
                            <ListItem onClick={() => handleLanguageClick('en')}>
                                <span role='img' aria-label='English' style={{ cursor: 'pointer' }}>🇬🇧 ENG</span>
                            </ListItem>
                        </CustomList>
                    </Drawer>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
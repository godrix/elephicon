const builder = require('electron-builder');

builder
  .build({
    config: {
      productName: 'GenIcons',
      copyright: 'Copyright (C) 2020 Office Nishigami.',
      artifactName: '${productName}-${version}-${platform}.${ext}',
      files: ['dist/**/*'],
      directories: {
        output: 'release',
      },
      asar: true,
      asarUnpack: ['dist/preload.js'],
      mac: {
        category: 'public.app-category.developer-tools',
        target: ['dmg'],
        icon: 'assets/icon.icns',
        extendInfo: {
          CFBundleName: 'GenIcons',
          CFBundleDisplayName: 'GenIcons',
          CFBundleExecutable: 'GenIcons',
          CFBundlePackageType: 'APPL',
          CFBundleDocumentTypes: [
            {
              CFBundleTypeName: 'ImageFile',
              CFBundleTypeRole: 'Viewer',
              LSItemContentTypes: ['public.png'],
              LSHandlerRank: 'Default',
            },
          ],
          NSRequiresAquaSystemAppearance: false,
        },
      },
      dmg: {
        icon: 'assets/dmg.icns',
      },
      win: {
        icon: 'assets/icon.ico',
        target: ['nsis'],
        publisherName: 'sprout2000',
        fileAssociations: [
          {
            ext: ['png'],
            description: 'Image files',
          },
        ],
      },
      nsis: {
        oneClick: false,
        perMachine: false,
        createDesktopShortcut: false,
        createStartMenuShortcut: true,
        installerIcon: 'assets/installerIcon.ico',
        artifactName: '${productName}-${version}-installer.${ext}',
      },
    },
  })
  .catch((err) => console.log(err));
